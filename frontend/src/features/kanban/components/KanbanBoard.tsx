import { useMemo, useState } from 'react';
import { useTodosQuery, type Todo } from '@/features/kanban/hooks/useTodosQuery';
import { DEFAULT_COLUMNS } from '@/features/kanban/constants/status';
import { KanbanColumn } from '@/features/kanban/columns/KanbanColumn';
import { TodoCard } from '@/features/kanban/cards/TodoCard';
import { LoadingState, ErrorState, EmptyState } from './BoardStateIndicators';
import { TodoFormDialog } from './TodoFormDialog';
import { useTodoMutations } from '@/features/kanban/hooks/useTodoMutations';
import type { TodoFormData } from '@/features/kanban/lib/todoSchema';

export function KanbanBoard() {
  const { data: todos, isLoading, error, refetch } = useTodosQuery();
  const mutations = useTodoMutations();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);

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

  const handleCreateTodo = () => {
    setEditingTodo(undefined);
    setIsFormOpen(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleDeleteTodo = (todo: Todo) => {
    if (todo.archivedAt) {
      mutations.restore.mutate(todo.id);
    } else {
      mutations.archive.mutate(todo.id);
    }
  };

  const handleFormSubmit = (data: TodoFormData) => {
    if (editingTodo) {
      mutations.update.mutate(
        { id: editingTodo.id, data },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setEditingTodo(undefined);
          },
        }
      );
    } else {
      mutations.create.mutate(data, {
        onSuccess: () => {
          setIsFormOpen(false);
        },
      });
    }
  };

  if (!todos || todos.length === 0) {
    return (
      <>
        <EmptyState
          message="No todos yet. Create one to get started!"
          action={{
            label: 'Create Todo',
            onClick: handleCreateTodo,
          }}
        />
        <TodoFormDialog
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleFormSubmit}
          initialData={editingTodo}
          isLoading={mutations.isLoading}
        />
      </>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Kanban Board</h1>
          <button className="btn btn-primary btn-sm" onClick={handleCreateTodo}>
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
                  columnTodos.map((todo) => (
                    <TodoCard
                      key={todo.id}
                      todo={todo}
                      onEdit={() => handleEditTodo(todo)}
                      onDelete={() => handleDeleteTodo(todo)}
                    />
                  ))
                )}
              </KanbanColumn>
            );
          })}
        </div>
      </div>

      <TodoFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        initialData={editingTodo}
        isLoading={mutations.isLoading}
      />
    </>
  );
}
