import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { UserRepository } from '../modules/users/user.repository.js';

export interface AuthRequest<P = unknown, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown>
  extends Request<P, ResBody, ReqBody, ReqQuery> {
  userId?: string;
  userRole?: string;
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token de autenticación requerido' });
      return;
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    const userRepository = new UserRepository();
    const user = await userRepository.findById(payload.userId);
    if (!user) {
      res.status(401).json({ error: 'Usuario no encontrado' });
      return;
    }

    req.userId = payload.userId;
    req.userRole = payload.role;
    next();
  } catch (error) {
    res.status(401).json({ error: error instanceof Error ? error.message : 'Token inválido' });
  }
}

export function adminMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  if (req.userRole !== 'admin') {
    res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador' });
    return;
  }
  next();
}

