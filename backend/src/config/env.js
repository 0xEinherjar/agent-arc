import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Server
  PORT: z.string().regex(/^\d+$/).transform(Number).default('3000'),
  
  // Twitter OAuth
  TWITTER_CONSUMER_KEY: z.string().min(1, 'TWITTER_CONSUMER_KEY is required'),
  TWITTER_CONSUMER_SECRET: z.string().min(1, 'TWITTER_CONSUMER_SECRET is required'),
  TWITTER_ACCESS_TOKEN: z.string().min(1, 'TWITTER_ACCESS_TOKEN is required'),
  TWITTER_ACCESS_SECRET: z.string().min(1, 'TWITTER_ACCESS_SECRET is required'),
  TWITTER_CALLBACK_URL: z.string().url('TWITTER_CALLBACK_URL must be a valid URL').optional(),
  
  // Frontend
  FRONTEND_URL: z.string().url('FRONTEND_URL must be a valid URL'),
  
  // Session
  SESSION_SECRET: z.string().min(6, 'SESSION_SECRET must be at least 6 characters'),
  
  // JWT
  JWT_SECRET: z.string().min(6, 'JWT_SECRET must be at least 6 characters'),
  JWT_EXPIRES_IN: z.string().default('24h'),
  
  // MongoDB
  MONGODB_URI: z.string().url('MONGODB_URI must be a valid URL'),
  MONGODB_NAME_DATABASE: z.string().min(1, 'MONGODB_NAME_DATABASE is required'),
  
  // Privy
  PRIVY_APP_ID: z.string().min(1, 'PRIVY_APP_ID is required'),
  PRIVY_APP_SECRET: z.string().min(1, 'PRIVY_APP_SECRET is required'),
  
  // OpenAI (optional - used by agent)
  LLM_API_KEY: z.string().optional(),
  LLM_MODEL: z.string().optional(),
});

export function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join('\n');
      throw new Error(`Invalid environment variables:\n${missingVars}`);
    }
    throw error;
  }
}

