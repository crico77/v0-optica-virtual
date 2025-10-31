import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { UserRole } from '../types/index.js';

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
}

