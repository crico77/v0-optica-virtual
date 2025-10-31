import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  full_name: z.string().min(1, 'El nombre completo es requerido'),
  phone: z.string().optional()
});

export const updateUserSchema = z.object({
  full_name: z.string().min(1).optional(),
  phone: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida')
});

