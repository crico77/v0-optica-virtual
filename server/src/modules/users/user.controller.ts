import { Request, Response } from 'express';
import { UserService } from './user.service.js';
import { generateToken } from '../../utils/jwt.js';
import type { AuthRequest } from '../../middlewares/auth.middleware.js';
import type { CreateUserInput, UpdateUserInput, LoginInput } from '../../types/index.js';

export class UserController {
  private service = new UserService();

  async register(req: Request<unknown, unknown, CreateUserInput>, res: Response): Promise<void> {
    try {
      const user = await this.service.create(req.body);
      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
      });

      res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
          phone: user.phone
        }
      });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Error al crear usuario' });
    }
  }

  async login(req: Request<unknown, unknown, LoginInput>, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await this.service.findByEmail(email);

      if (!user) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }

      const isValid = await this.service.verifyPassword(user, password);
      if (!isValid) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
      });

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
          phone: user.phone
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  }

  async getAll(_req: AuthRequest, res: Response): Promise<void> {
    try {
      const users = await this.service.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }

  async getById(req: AuthRequest<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.service.findById(id);

      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  }

  async update(req: AuthRequest<{ id: string }, unknown, UpdateUserInput>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.userId;

      if (userId !== id && req.userRole !== 'admin') {
        res.status(403).json({ error: 'No tienes permiso para actualizar este usuario' });
        return;
      }

      const user = await this.service.update(id, req.body);
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  }

  async delete(req: AuthRequest<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (req.userRole !== 'admin') {
        res.status(403).json({ error: 'No tienes permiso para eliminar usuarios' });
        return;
      }

      const deleted = await this.service.delete(id);
      if (!deleted) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  }

  async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ error: 'No autenticado' });
        return;
      }

      const user = await this.service.findById(userId);
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener perfil' });
    }
  }
}

