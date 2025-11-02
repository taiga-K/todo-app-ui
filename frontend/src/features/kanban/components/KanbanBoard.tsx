import { useMemo } from 'react';
import { useTodosQuery, type Todo } from '@/features/kanban/hooks/useTodosQuery';
import { DEFAULT_COLUMNS } from '@/features/kanban/constants/status';
import { KanbanColumn } from '@/features/kanban/columns/KanbanColumn';
import { TodoCard } from '@/features/kanban/cards/TodoCard';
import { LoadingState, ErrorState, EmptyState } from './BoardStateIndicators';

export function KanbanBoard() {
  const { data: todos, isLoading, error, refetch } = useTodosQuery();

  // Group todos by status
  const todosByColumn = useMemo(() => {
    if (!todos) return {};

    return todos.reduce(
      (acc, todo) => {
        const status = todo.status;
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(todo);
        return acc;
      },
      {} as Record<string, Todo[]>
    );
  }, [todos]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error as Error} onRetry={() => refetch()} />;
  }

  if (!todos || todos.length === 0) {
    return (
      <EmptyState
        message="No todos yet. Create one to get started!"
        action={{
          label: 'Create Todo',
          onClick: () => {
            // Will be implemented in Phase 4
            console.log('Create todo clicked');
          },
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
        <button className="btn btn-primary btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Todo
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {DEFAULT_COLUMNS.map((column) => {
          const columnTodos = todosByColumn[column.key] || [];

          return (
            <KanbanColumn key={column.key} column={column} count={columnTodos.length}>
              {columnTodos.length === 0 ? (
                <div className="text-center text-base-content/40 py-8">
                  <p>No tasks</p>
                </div>
              ) : (
                columnTodos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
              )}
            </KanbanColumn>
          );
        })}
      </div>
    </div>
  );
}
