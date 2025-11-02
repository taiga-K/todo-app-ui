import type { Todo } from '@/features/kanban/hooks/useTodosQuery';
import { PRIORITY_COLORS, PRIORITY_LABELS } from '@/features/kanban/constants/status';
import { cn } from '@/lib/utils';

interface TodoCardProps {
  todo: Todo;
  onClick?: () => void;
}

export function TodoCard({ todo, onClick }: TodoCardProps) {
  const formattedDueDate = todo.dueDate
    ? new Date(todo.dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null;

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && todo.status !== 'done';

  return (
    <div
      className={cn(
        'card bg-base-100 shadow-sm hover:shadow-md transition-all cursor-pointer border border-base-300',
        onClick && 'hover:border-primary'
      )}
      onClick={onClick}
    >
      <div className="card-body p-4 space-y-2">
        <h3 className="card-title text-base font-semibold">{todo.title}</h3>

        {todo.description && (
          <p className="text-sm text-base-content/70 line-clamp-2">{todo.description}</p>
        )}

        <div className="flex flex-wrap gap-2 items-center">
          {todo.priority && (
            <span className={cn('badge badge-sm', PRIORITY_COLORS[todo.priority])}>
              {PRIORITY_LABELS[todo.priority]}
            </span>
          )}

          {formattedDueDate && (
            <span
              className={cn(
                'badge badge-sm badge-outline',
                isOverdue && 'badge-error'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formattedDueDate}
            </span>
          )}

          {todo.assignee && (
            <div className="flex items-center gap-1 text-xs text-base-content/70">
              {todo.assignee.avatarUrl ? (
                <img
                  src={todo.assignee.avatarUrl}
                  alt={todo.assignee.name}
                  className="w-5 h-5 rounded-full"
                />
              ) : (
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-5">
                    <span className="text-xs">{todo.assignee.name[0]}</span>
                  </div>
                </div>
              )}
              <span>{todo.assignee.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
