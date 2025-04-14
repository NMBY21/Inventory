import axios from 'axios';
import * as jose from 'jose';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000000,
});

// Function to verify JWT token
const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jose.decodeJwt(token);
    if (!decodedToken.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= decodedToken.exp;
  } catch (error: any) {
    console.error('Error decoding token:', error.message);
    return true;
  }
}

// Token verification on initialization
let decodedToken: jose.JWTPayload | null = null;
const token = localStorage.getItem('token');
if (token) {
  if (!isTokenExpired(token)) {
    decodedToken = jose.decodeJwt(token);
  }
}

// Request interceptor
api.interceptors.request.use(
    (config) => {
      // Add Authorization header to every request if a token is available
      if (decodedToken) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
      // You can handle specific response cases here
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error, e.g., redirect to login
        console.log(error);
        // window.location.href = '/login';
      }
      return Promise.reject(error);
    }
);

export default api;
