import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  timeout: 1000,
  responseType: 'json',
  xsrfCookieName: 'XSRF-TOKEN',
});
