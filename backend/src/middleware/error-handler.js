import logger from '../config/logger.js';
import { httpStatusFromErrorType } from '../shared/http-status.js';

export default function errorHandler(err, req, res, next) {
  logger.error('Error occurred', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message || 'An error occurred',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  if (err.type) {
    const statusCode = httpStatusFromErrorType(err.type);
    return res.status(statusCode).json({
      error: err.message || 'An error occurred',
    });
  }

  // Erro genérico do servidor
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

