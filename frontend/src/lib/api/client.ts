import ky from 'ky';
import { mockTodos } from './mockData';

const API_BASE_URL = import.meta.env.VITE_TODO_API_BASE_URL || 'https://api.example.com';
const API_TOKEN = import.meta.env.VITE_TODO_API_TOKEN || '';
const IS_MOCK_MODE = import.meta.env.MODE === 'mock' || !API_TOKEN;

// Mock storage for development
let mockTodoStorage = [...mockTodos];

// Mock API client for development
const mockClient = {
  get: (url: string) => ({
    json: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (url.startsWith('todos')) {
        return { data: mockTodoStorage };
      }
      throw new Error('Mock endpoint not found');
    },
  }),
  post: (url: string, options?: { json?: unknown }) => ({
    json: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (url === 'todos' && options?.json) {
        const input = options.json as {
          title: string;
          status: string;
          description?: string;
          priority?: string;
          dueDate?: string;
          assigneeId?: string;
        };
        const newTodo = {
          id: `mock-${Date.now()}`,
          title: input.title,
          description: input.description || null,
          status: input.status as 'backlog' | 'in_progress' | 'done',
          priority: input.priority as 'low' | 'medium' | 'high' | 'urgent' | undefined,
          dueDate: input.dueDate || null,
          assignee: undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          archivedAt: null,
        };
        mockTodoStorage.push(newTodo);
        return newTodo;
      }

      if (url.includes('/archive')) {
        // Extract ID from 'todos/{id}/archive'
        const id = url.split('/')[1];
        const todo = mockTodoStorage.find((t) => t.id === id);
        if (todo) {
          todo.archivedAt = new Date().toISOString();
        }
        return;
      }

      if (url.includes('/restore')) {
        // Extract ID from 'todos/{id}/restore'
        const id = url.split('/')[1];
        const todo = mockTodoStorage.find((t) => t.id === id);
        if (todo) {
          todo.archivedAt = null;
        }
        return todo;
      }

      throw new Error('Mock endpoint not found');
    },
  }),
  patch: (url: string, options?: { json?: unknown }) => ({
    json: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Extract ID from 'todos/{id}' or 'todos/{id}/status'
      const parts = url.split('/');
      const id = parts[1];
      const todoIndex = mockTodoStorage.findIndex((t) => t.id === id);

      if (todoIndex >= 0 && options?.json) {
        mockTodoStorage[todoIndex] = {
          ...mockTodoStorage[todoIndex],
          ...(options.json as object),
          updatedAt: new Date().toISOString(),
        };
        return mockTodoStorage[todoIndex];
      }

      throw new Error('Mock todo not found');
    },
  }),
  delete: (url: string) => ({
    json: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const id = url.split('/')[1];
      mockTodoStorage = mockTodoStorage.filter((t) => t.id !== id);
      return;
    },
  }),
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
