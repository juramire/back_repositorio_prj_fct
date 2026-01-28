import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../../db/pool.js';
import { config } from '../../config/env.js';
import { toUserDTO } from '../../utils/dto-mapper.js';

export const findUserByEmail = async email => {
  const [rows] = await pool.execute(
    'SELECT id, name, email, rol, password_hash FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0];
};

export const findUserById = async id => {
  const [rows] = await pool.execute('SELECT id, name, email, rol FROM users WHERE id = ? LIMIT 1', [id]);
  return rows[0];
};

export const login = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;
  const token = jwt.sign({ id: user.id, rol: user.rol, email: user.email, name: user.name }, config.jwtSecret, {
    expiresIn: '2h'
  });
  return { token, user: toUserDTO(user) };
};
