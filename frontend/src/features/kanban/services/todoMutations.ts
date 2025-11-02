import { useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/api/client';
import { queryClient } from '@/lib/query/queryClient';
import type { Todo } from '@/features/kanban/hooks/useTodosQuery';
import type { TodoFormData } from '@/features/kanban/lib/todoSchema';
import type { components } from '@/generated/todo';

type TodoCreateInput = components['schemas']['TodoCreateInput'];
type TodoUpdateInput = components['schemas']['TodoUpdateInput'];

export function useCreateTodoMutation() {
  return useMutation({
    mutationFn: async (data: TodoFormData): Promise<Todo> => {
      const input: TodoCreateInput = {
        title: data.title,
        description: data.description || undefined,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate,
        assigneeId: data.assigneeId,
      };

      const response = await apiClient.post('todos', { json: input }).json<Todo>();
      return response;
    },
    onSuccess: () => {
      // Invalidate todos query to refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useUpdateTodoMutation() {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TodoFormData> }): Promise<Todo> => {
      const input: TodoUpdateInput = {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate,
        assigneeId: data.assigneeId,
      };

      const response = await apiClient.patch(`todos/${id}`, { json: input }).json<Todo>();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useUpdateTodoStatusMutation() {
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: components['schemas']['TodoStatus'];
    }): Promise<Todo> => {
      const response = await apiClient
        .patch(`todos/${id}/status`, { json: { status } })
        .json<Todo>();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useArchiveTodoMutation() {
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiClient.post(`todos/${id}/archive`).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useRestoreTodoMutation() {
  return useMutation({
    mutationFn: async (id: string): Promise<Todo> => {
      const response = await apiClient.post(`todos/${id}/restore`).json<Todo>();
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
