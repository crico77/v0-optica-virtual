const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  details?: Array<{ path: string; message: string }>;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || 'Error en la solicitud',
        details: data.details,
      };
    }

    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Error de conexión',
    };
  }
}

export const api = {
  // Auth
  async register(email: string, password: string, full_name: string, phone?: string) {
    return apiRequest<{ token: string; user: any }>('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, full_name, phone }),
    });
  },

  async login(email: string, password: string) {
    return apiRequest<{ token: string; user: any }>('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async getProfile() {
    return apiRequest('/api/users/profile');
  },

  // Products
  async getProducts(categoryId?: string) {
    const url = categoryId ? `/api/products?category_id=${categoryId}` : '/api/products';
    return apiRequest(url);
  },

  async getProduct(id: string) {
    return apiRequest(`/api/products/${id}`);
  },

  // Appointments
  async getAppointments() {
    return apiRequest('/api/appointments');
  },

  async createAppointment(data: { product_id?: string; scheduled_at: string; notes?: string }) {
    return apiRequest('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateAppointment(id: string, data: any) {
    return apiRequest(`/api/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteAppointment(id: string) {
    return apiRequest(`/api/appointments/${id}`, {
      method: 'DELETE',
    });
  },
};

