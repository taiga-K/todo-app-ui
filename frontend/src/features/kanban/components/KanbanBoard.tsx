import { useMemo, useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { useTodosQuery, type Todo } from '@/features/kanban/hooks/useTodosQuery';
import { DEFAULT_COLUMNS } from '@/features/kanban/constants/status';
import type { TodoStatus } from '@/features/kanban/constants/status';
import { KanbanColumn } from '@/features/kanban/columns/KanbanColumn';
import { DraggableTodoCard } from '@/features/kanban/cards/DraggableTodoCard';
import { LoadingState, ErrorState, EmptyState } from './BoardStateIndicators';
import { TodoFormDialog } from './TodoFormDialog';
import { TodoStatusMenu } from './TodoStatusMenu';
import { KanbanDragContext } from './KanbanDragContext';
import { FilterBar } from './FilterBar';
import { useTodoMutations } from '@/features/kanban/hooks/useTodoMutations';
import { useFilterStore } from '@/features/kanban/store/filterStore';
import type { TodoFormData } from '@/features/kanban/lib/todoSchema';

export function KanbanBoard() {
  const { search, sortBy, priority, assigneeId } = useFilterStore();
  const { data: todos, isLoading, error, refetch } = useTodosQuery({
    search,
    sort: sortBy || undefined,
    assigneeId: assigneeId || undefined,
  });
  const mutations = useTodoMutations();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);

  // Group todos by status and apply client-side priority filter
  const todosByColumn = useMemo(() => {
    if (!todos) return {};

    let filteredTodos = todos;

    // Apply client-side priority filter
    if (priority) {
      filteredTodos = todos.filter((todo) => todo.priority === priority);
    }

    return filteredTodos.reduce(
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
  }, [todos, priority]);

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const todoId = active.id as string;
    const newStatus = over.data.current?.status as TodoStatus;

    if (!newStatus) return;

    // Find the todo being dragged
    const todo = todos?.find((t) => t.id === todoId);
    if (!todo || todo.status === newStatus) return;

    // Update the status via API
    mutations.updateStatus.mutate({ id: todoId, status: newStatus });
  };

  const handleStatusChange = (todo: Todo, newStatus: TodoStatus) => {
    if (todo.status === newStatus) return;
    mutations.updateStatus.mutate({ id: todo.id, status: newStatus });
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

  const hasActiveFilters = search || sortBy || priority;
  const totalTodos = todos?.length || 0;
  const filteredCount = Object.values(todosByColumn).flat().length;

  return (
    <>
      <KanbanDragContext onDragEnd={handleDragEnd}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Kanban Board</h1>
              {hasActiveFilters && (
                <p className="text-sm text-base-content/60 mt-1">
                  Showing {filteredCount} of {totalTodos} todos
                </p>
              )}
            </div>
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

          <FilterBar />

          <div className="flex gap-4 overflow-x-auto pb-4">
            {DEFAULT_COLUMNS.map((column) => {
              const columnTodos = todosByColumn[column.key] || [];
              const todoIds = columnTodos.map((todo) => todo.id);

              return (
                <KanbanColumn
                  key={column.key}
                  column={column}
                  count={columnTodos.length}
                  items={todoIds}
                >
                  {columnTodos.length === 0 ? (
                    <div className="text-center text-base-content/40 py-8">
                      <p>No tasks</p>
                    </div>
                  ) : (
                    columnTodos.map((todo) => (
                      <div key={todo.id} className="relative group">
                        <DraggableTodoCard
                          todo={todo}
                          onEdit={() => handleEditTodo(todo)}
                          onDelete={() => handleDeleteTodo(todo)}
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <TodoStatusMenu
                            currentStatus={todo.status}
                            onStatusChange={(status) => handleStatusChange(todo, status)}
                            disabled={mutations.isLoading}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </KanbanColumn>
              );
            })}
          </div>
        </div>
      </KanbanDragContext>

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
