import axios from 'axios';
import { storage } from '../utils/storage';
import { LoginResponse, DeliveriesResponse, Delivery } from '../types';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(async (config) => {
  const token = await storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  }
};

export const deliveriesAPI = {
  getByDriverId: async (driverId: string): Promise<DeliveriesResponse> => {
    const response = await api.get(`/deliveries/${driverId}`);
    return response.data;
  },

  updateStatus: async (id: string, status: Delivery['status']): Promise<Delivery> => {
    const response = await api.patch(`/deliveries/${id}/status`, { status });
    return response.data.delivery;
  }
};
