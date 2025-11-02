import ky from 'ky';
import { mockTodos } from './mockData';

const API_BASE_URL = import.meta.env.VITE_TODO_API_BASE_URL || 'https://api.example.com';
const API_TOKEN = import.meta.env.VITE_TODO_API_TOKEN || '';
const IS_MOCK_MODE = import.meta.env.MODE === 'mock' || !API_TOKEN;

// Mock API client for development
const mockClient = {
  get: (url: string) => ({
    json: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (url.startsWith('todos')) {
        return { data: mockTodos };
      }
      throw new Error('Mock endpoint not found');
    },
  }),
  post: () => ({ json: async () => ({}) }),
  patch: () => ({ json: async () => ({}) }),
  delete: () => ({ json: async () => ({}) }),
};

export const apiClient = IS_MOCK_MODE
  ? (mockClient as unknown as typeof ky)
  : ky.create({
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
