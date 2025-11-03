import { DEFAULT_COLUMNS } from '@/features/kanban/constants/status';
import type { TodoStatus } from '@/features/kanban/constants/status';
import { cn } from '@/lib/utils';

interface TodoStatusMenuProps {
  currentStatus: TodoStatus;
  onStatusChange: (status: TodoStatus) => void;
  disabled?: boolean;
}

export function TodoStatusMenu({
  currentStatus,
  onStatusChange,
  disabled = false,
}: TodoStatusMenuProps) {
  return (
    <div className="dropdown dropdown-end" onClick={(e) => e.stopPropagation()}>
      <button
        tabIndex={0}
        className="btn btn-ghost btn-xs"
        disabled={disabled}
        aria-label="Change status"
      >
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
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
        Move
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-base-300"
        role="menu"
        aria-label="Status options"
      >
        {DEFAULT_COLUMNS.map((column) => (
          <li key={column.key} role="menuitem">
            <button
              onClick={() => onStatusChange(column.key)}
              disabled={column.key === currentStatus}
              className={cn(
                'flex items-center justify-between',
                column.key === currentStatus && 'active'
              )}
              aria-current={column.key === currentStatus ? 'true' : undefined}
            >
              <span>{column.displayName}</span>
              {column.key === currentStatus && (
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
