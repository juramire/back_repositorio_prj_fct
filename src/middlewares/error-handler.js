import { logError } from '../config/logger.js';

export const errorHandler = (err, req, res, _next) => {
  logError('Unhandled error', { error: err.message, stack: err.stack });
  if (res.headersSent) return;
  const status = err.status ?? 500;
  res.status(status).json({ message: err.message ?? 'Internal Server Error' });
};
