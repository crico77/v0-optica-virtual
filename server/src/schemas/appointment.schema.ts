import { z } from 'zod';

export const createAppointmentSchema = z.object({
  product_id: z.string().uuid().optional(),
  scheduled_at: z.string().datetime('Fecha y hora inválida'),
  notes: z.string().optional()
});

export const updateAppointmentSchema = z.object({
  product_id: z.string().uuid().optional(),
  scheduled_at: z.string().datetime().optional(),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
  notes: z.string().optional()
});

