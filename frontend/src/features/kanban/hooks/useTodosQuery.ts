import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api/client';
import type { components } from '@/generated/todo';

type Todo = components['schemas']['Todo'];
type TodoStatus = components['schemas']['TodoStatus'];

interface TodosQueryParams {
  status?: TodoStatus[];
  search?: string;
  assigneeId?: string;
  sort?: 'priority' | 'dueDate';
}

interface TodosResponse {
  data: Todo[];
}

export function useTodosQuery(params: TodosQueryParams = {}) {
  return useQuery({
    queryKey: ['todos', params],
    queryFn: async (): Promise<Todo[]> => {
      const searchParams = new URLSearchParams();

      if (params.status?.length) {
        params.status.forEach((s) => searchParams.append('status', s));
      }
      if (params.search) {
        searchParams.set('search', params.search);
      }
      if (params.assigneeId) {
        searchParams.set('assigneeId', params.assigneeId);
      }
      if (params.sort) {
        searchParams.set('sort', params.sort);
      }

      const queryString = searchParams.toString();
      const url = queryString ? `todos?${queryString}` : 'todos';

      const response = await apiClient.get(url).json<TodosResponse>();
      return response.data || [];
    },
  });
}

export type { Todo, TodoStatus, TodosQueryParams };
