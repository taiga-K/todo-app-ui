import { useEffect, useRef, useState } from 'react';

interface TodoCardMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  isArchived?: boolean;
}

export function TodoCardMenu({ onEdit, onDelete, isArchived = false }: TodoCardMenuProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleDelete = () => {
    if (showConfirm) {
      onDelete();
      setShowConfirm(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    } else {
      setShowConfirm(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Auto-hide confirm after 3 seconds
      timeoutRef.current = setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="dropdown dropdown-end" onClick={(e) => e.stopPropagation()}>
      <button tabIndex={0} className="btn btn-ghost btn-xs btn-circle" aria-label="Todo actions">
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
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-base-300"
      >
        <li>
          <button onClick={onEdit}>
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>
        </li>
        <li>
          <button onClick={handleDelete} className={showConfirm ? 'text-error' : ''}>
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            {showConfirm ? 'Click again to confirm' : isArchived ? 'Restore' : 'Delete'}
          </button>
        </li>
      </ul>
    </div>
  );
}
