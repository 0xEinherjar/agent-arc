import 'dotenv/config';
import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import { Strategy } from "passport-twitter";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import Database from "./repository/database.js";
import { constants } from './shared/constant.js';
import logger from './config/logger.js';
import routerUser from "./router/user.js";
import { SaveUserFactory } from './factory/user/save.js';
import { startTwitterService } from './twitter.js';
import { 
  securityMiddleware, 
  authRateLimiter, 
  apiRateLimiter,
  corsOptions 
} from './middleware/security.js';
import requestLogger from './middleware/request-logger.js';
import errorHandler from './middleware/error-handler.js';
import notFoundHandler from './middleware/not-found.js';

const app = express();
const database = new Database();
let stopTwitterService = null;

// Trust proxy (important for production behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware
app.use(securityMiddleware);
app.use(cors(corsOptions));

// Body parser with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Request logging
app.use(requestLogger);

// Session configuration
const isProduction = constants.NODE_ENV === 'production';
app.use(
  session({
    secret: constants.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction, // HTTPS only in production
      httpOnly: true,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 3600_000, // 1 hour
    },
    name: 'sessionId', // Don't use default 'connect.sid'
  })
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Twitter OAuth callback URL - must point to backend server
// In production, TWITTER_CALLBACK_URL should be set explicitly
const callbackURL = constants.TWITTER_CALLBACK_URL || `http://localhost:${constants.PORT}/auth/twitter/callback`;

passport.use(
  new Strategy(
    {
      consumerKey: constants.TWITTER_CONSUMER_KEY,
      consumerSecret: constants.TWITTER_CONSUMER_SECRET,
      callbackURL: callbackURL,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const result = await SaveUserFactory().execute(profile);
        if (result.isRight()) {
          return done(null, result.value);
        }
        return done(new Error(result.value.message || 'Failed to save user'), null);
      } catch (error) {
        logger.error('Error in Twitter OAuth callback', { error: error.message, stack: error.stack });
        return done(error, null);
      }
    }
  )
);

// Health check endpoint (before rate limiting)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: constants.NODE_ENV,
  });
});

// Apply rate limiting to auth routes
app.use("/auth", authRateLimiter);

// Twitter OAuth routes
app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: `${constants.FRONTEND_URL}/#/`,
    session: false, // We're using JWT, not sessions
  }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user.id, twitterId: req.user.twitterId },
        constants.JWT_SECRET,
        { expiresIn: constants.JWT_EXPIRES_IN }
      );
      
      res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 3600_000 // 1 hour
      });
      
      req.session.destroy(() => {
        res.redirect(`${constants.FRONTEND_URL}/#/home`);
      });
    } catch (error) {
      logger.error('Error in Twitter callback handler', { error: error.message });
      res.redirect(`${constants.FRONTEND_URL}/#/?error=authentication_failed`);
    }
  }
);

app.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
  });
  return res.status(200).json({ message: 'Logged out successfully' });
});

// Apply rate limiting to API routes
app.use(apiRateLimiter);

// API routes
app.use("/user", routerUser);

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = constants.PORT;
const processId = process.pid;

let server;

async function startServer() {
  try {
    // Connect to database
    await database.connect();
    logger.info('Database connected successfully');

    // Start HTTP server
    server = app.listen(PORT, () => {
      logger.info(`Server started successfully`, {
        port: PORT,
        processId,
        environment: constants.NODE_ENV,
        nodeVersion: process.version,
      });
    });

    // Handle server errors
    server.on('error', (error) => {
      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

      switch (error.code) {
        case 'EACCES':
          logger.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          logger.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });

    // Start Twitter service (if agent is available)
    stopTwitterService = startTwitterService();

  } catch (error) {
    logger.error('Failed to start server', { error: error.message, stack: error.stack });
    process.exit(1);
  }
}

// Graceful shutdown
let shutdownInProgress = false;

async function gracefulShutdown(signal) {
  if (shutdownInProgress) {
    logger.warn('Shutdown already in progress, forcing exit');
    process.exit(1);
  }

  shutdownInProgress = true;
  logger.info(`${signal} received, starting graceful shutdown...`);

  const shutdownTimeout = setTimeout(() => {
    logger.error('Graceful shutdown timeout, forcing exit');
    process.exit(1);
  }, 30000); // 30 seconds timeout

  try {
    // Stop Twitter service
    if (stopTwitterService) {
      stopTwitterService();
      logger.info('Twitter service stopped');
    }

    // Close HTTP server
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      logger.info('HTTP server closed');
    }

    // Close database connection
    await database.close();
    logger.info('Database connection closed');

    clearTimeout(shutdownTimeout);
    logger.info('Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    logger.error('Error during graceful shutdown', { error: error.message, stack: error.stack });
    clearTimeout(shutdownTimeout);
    process.exit(1);
  }
}

// Handle termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', { error: error.message, stack: error.stack });
  gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection', { reason, promise });
  gracefulShutdown('unhandledRejection');
});

// Start the server
startServer();
