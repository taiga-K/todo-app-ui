import ky from 'ky';

const API_BASE_URL = import.meta.env.VITE_TODO_API_BASE_URL || 'https://api.example.com';
const API_TOKEN = import.meta.env.VITE_TODO_API_TOKEN || '';

export const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
  },
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  timeout: 10000,
});

export default apiClient;
