import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  sku: z.string().optional(),
  price_cents: z.number().int().min(0, 'El precio debe ser mayor o igual a 0'),
  currency: z.string().default('USD'),
  stock: z.number().int().min(0).default(0),
  category_id: z.string().uuid().optional(),
  image_url: z.string().url('URL inválida').optional().or(z.literal(''))
});

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  sku: z.string().optional(),
  price_cents: z.number().int().min(0).optional(),
  currency: z.string().optional(),
  stock: z.number().int().min(0).optional(),
  category_id: z.string().uuid().optional(),
  image_url: z.string().url().optional().or(z.literal(''))
});

