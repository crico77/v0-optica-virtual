export type UserRole = 'user' | 'admin';
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: UserRole;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  sku: string | null;
  price_cents: number;
  currency: string;
  stock: number;
  category_id: string | null;
  image_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Appointment {
  id: string;
  user_id: string;
  product_id: string | null;
  scheduled_at: Date;
  status: AppointmentStatus;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
}

export interface UpdateUserInput {
  full_name?: string;
  phone?: string;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  sku?: string;
  price_cents: number;
  currency?: string;
  stock?: number;
  category_id?: string;
  image_url?: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  sku?: string;
  price_cents?: number;
  currency?: string;
  stock?: number;
  category_id?: string;
  image_url?: string;
}

export interface CreateAppointmentInput {
  product_id?: string;
  scheduled_at: string; // ISO string
  notes?: string;
}

export interface UpdateAppointmentInput {
  product_id?: string;
  scheduled_at?: string;
  status?: AppointmentStatus;
  notes?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    full_name: string;
    role: UserRole;
    phone: string | null;
  };
}

