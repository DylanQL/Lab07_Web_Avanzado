import axios from 'axios';
import authHeader from './auth-header';
import { TEST_API_URL } from '../config/api.config';

const API_URL = TEST_API_URL;

class UserService {
  getPublicContent() {
    return axios.get(`${API_URL}all`);
  }

  getUserBoard() {
    return axios.get(`${API_URL}user`, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(`${API_URL}mod`, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(`${API_URL}admin`, { headers: authHeader() });
  }
}

const userService = new UserService();
export default userService;
