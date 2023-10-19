import axios from 'axios';

const apiService = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URI_API}/api_portal/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiService.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token && !config?.headers?.Authorization) { config.headers.Authorization = `Bearer ${token}`; }
    return config;
  },
  error => Promise.reject(error)
);

export const setLogoutResponseInterceptor = doLogout => {
  apiService.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        const authError = error.response.data.errors === 'JWT::VerificationError';
        localStorage.removeItem('user');
        doLogout({ authError });
      }
      return Promise.reject(error);
    }
  );
};

export const fileFetcher = () => axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URI_API}/api_portal/v1`,
  responseType: 'blob',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});

export default apiService;
