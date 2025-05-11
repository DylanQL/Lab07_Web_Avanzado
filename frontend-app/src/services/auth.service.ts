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
    return axios.post(`${API_URL}signup`, user);
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
