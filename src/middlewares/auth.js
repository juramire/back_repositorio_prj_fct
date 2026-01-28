import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = { id: payload.id, rol: payload.rol, email: payload.email, name: payload.name };
    return next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.rol !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return next();
};
