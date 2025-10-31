import { AppointmentRepository } from './appointment.repository.js';
import { ProductRepository } from '../products/product.repository.js';
import type { Appointment, CreateAppointmentInput, UpdateAppointmentInput } from '../../types/index.js';

export class AppointmentService {
  private repository = new AppointmentRepository();
  private productRepository = new ProductRepository();

  async findAll(): Promise<Appointment[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Appointment | null> {
    return await this.repository.findById(id);
  }

  async findByUserId(userId: string): Promise<Appointment[]> {
    return await this.repository.findByUserId(userId);
  }

  async create(userId: string, data: CreateAppointmentInput): Promise<Appointment> {
    if (data.product_id) {
      const product = await this.productRepository.findById(data.product_id);
      if (!product) {
        throw new Error('El producto no existe');
      }
    }

    const scheduledAt = new Date(data.scheduled_at);
    if (scheduledAt < new Date()) {
      throw new Error('La fecha de la cita no puede ser en el pasado');
    }

    return await this.repository.create(userId, data);
  }

  async update(id: string, data: UpdateAppointmentInput): Promise<Appointment | null> {
    const existing = await this.repository.findById(id);
    if (!existing) return null;

    if (data.product_id) {
      const product = await this.productRepository.findById(data.product_id);
      if (!product) {
        throw new Error('El producto no existe');
      }
    }

    if (data.scheduled_at) {
      const scheduledAt = new Date(data.scheduled_at);
      if (scheduledAt < new Date()) {
        throw new Error('La fecha de la cita no puede ser en el pasado');
      }
    }

    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}

