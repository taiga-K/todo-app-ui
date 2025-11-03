interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Todoを読み込み中...' }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-base-content/70">{message}</p>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  error: Error;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="alert alert-error max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex-1">
          <h3 className="font-bold">Todoの読み込みエラー</h3>
          <p className="text-sm">{error.message}</p>
        </div>
        {onRetry && (
          <button className="btn btn-sm" onClick={onRetry}>
            再試行
          </button>
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  message = 'Todoが見つかりません',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 mx-auto text-base-content/20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="mt-4 text-lg text-base-content/70">{message}</p>
        {action && (
          <button className="btn btn-primary mt-4" onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
