import { Response } from 'express';
import { AppointmentService } from './appointment.service.js';
import type { AuthRequest } from '../../middlewares/auth.middleware.js';
import type { CreateAppointmentInput, UpdateAppointmentInput } from '../../types/index.js';

export class AppointmentController {
  private service = new AppointmentService();

  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const appointments = req.userRole === 'admin'
        ? await this.service.findAll()
        : await this.service.findByUserId(req.userId!);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener citas' });
    }
  }

  async getById(req: AuthRequest<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const appointment = await this.service.findById(id);

      if (!appointment) {
        res.status(404).json({ error: 'Cita no encontrada' });
        return;
      }

      if (req.userRole !== 'admin' && appointment.user_id !== req.userId) {
        res.status(403).json({ error: 'No tienes permiso para ver esta cita' });
        return;
      }

      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener cita' });
    }
  }

  async create(req: AuthRequest<unknown, unknown, CreateAppointmentInput>, res: Response): Promise<void> {
    try {
      const userId = req.userId!;
      const appointment = await this.service.create(userId, req.body);
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Error al crear cita' });
    }
  }

  async update(req: AuthRequest<{ id: string }, unknown, UpdateAppointmentInput>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const appointment = await this.service.findById(id);

      if (!appointment) {
        res.status(404).json({ error: 'Cita no encontrada' });
        return;
      }

      if (req.userRole !== 'admin' && appointment.user_id !== req.userId) {
        res.status(403).json({ error: 'No tienes permiso para actualizar esta cita' });
        return;
      }

      const updated = await this.service.update(id, req.body);
      if (!updated) {
        res.status(404).json({ error: 'Cita no encontrada' });
        return;
      }

      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Error al actualizar cita' });
    }
  }

  async delete(req: AuthRequest<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const appointment = await this.service.findById(id);

      if (!appointment) {
        res.status(404).json({ error: 'Cita no encontrada' });
        return;
      }

      if (req.userRole !== 'admin' && appointment.user_id !== req.userId) {
        res.status(403).json({ error: 'No tienes permiso para eliminar esta cita' });
        return;
      }

      const deleted = await this.service.delete(id);
      if (!deleted) {
        res.status(404).json({ error: 'Cita no encontrada' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar cita' });
    }
  }
}

