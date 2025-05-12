import axios from 'axios';
import { LoginRequest, RegisterRequest } from '../types/auth.types';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  async login(credentials: LoginRequest) {
    const response = await axios.post(`${API_URL}signin`, credentials);
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  async register(user: RegisterRequest) {
    try {
      console.log('Sending registration request:', user);
      const response = await axios.post(`${API_URL}signup`, user);
      console.log('Registration response:', response);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
}

const authService = new AuthService();
export default authService;
