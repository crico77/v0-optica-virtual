import bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository.js';
import type { CreateUserInput, UpdateUserInput, User } from '../../types/index.js';

export class UserService {
  private repository = new UserRepository();

  async findAll(): Promise<Omit<User, 'password_hash'>[]> {
    const users = await this.repository.findAll();
    return users.map(({ password_hash, ...user }) => user);
  }

  async findById(id: string): Promise<Omit<User, 'password_hash'> | null> {
    const user = await this.repository.findById(id);
    if (!user) return null;
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findByEmail(email);
  }

  async create(data: CreateUserInput): Promise<Omit<User, 'password_hash'>> {
    const existingUser = await this.repository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const password_hash = await bcrypt.hash(data.password, 10);
    const user = await this.repository.create({
      ...data,
      password_hash,
      role: 'user'
    });

    const { password_hash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: string, data: UpdateUserInput): Promise<Omit<User, 'password_hash'> | null> {
    const user = await this.repository.update(id, data);
    if (!user) return null;
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password_hash);
  }
}

