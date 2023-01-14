import axios from 'axios';

const axiosClient = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_APP_BE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosClient.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem(`token:${import.meta.env.VITE_APP_PERSIST_KEY}`)}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosClient;
