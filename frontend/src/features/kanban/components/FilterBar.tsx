import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { PRIORITY_LABELS } from '@/features/kanban/constants/status';
import type { TodoPriority } from '@/features/kanban/constants/status';
import { useFilterStore } from '@/features/kanban/store/filterStore';

export function FilterBar() {
  const {
    search,
    sortBy,
    priority,
    setSearch,
    setSortBy,
    setPriority,
    clearFilters,
  } = useFilterStore();

  const hasActiveFilters = search || sortBy || priority;

  const sortOptions = [
    { value: '', label: 'デフォルト' },
    { value: 'priority', label: '優先度' },
    { value: 'dueDate', label: '期限日' },
  ];

  const priorityOptions = [
    { value: '', label: 'すべての優先度' },
    ...Object.entries(PRIORITY_LABELS).map(([value, label]) => ({ value, label })),
  ];

  return (
    <div className="bg-base-100 rounded-lg shadow-sm border border-base-300 p-4">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Search */}
        <div className="form-control flex-1 min-w-[200px]">
          <label className="label">
            <span className="label-text text-sm">検索</span>
          </label>
          <Input
            type="text"
            placeholder="Todoを検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-sm"
          />
        </div>

        {/* Priority Filter */}
        <div className="form-control min-w-[180px]">
          <label className="label">
            <span className="label-text text-sm">優先度</span>
          </label>
          <Select
            options={priorityOptions}
            value={priority || ''}
            onChange={(e) =>
              setPriority((e.target.value as TodoPriority) || null)
            }
            className="select-sm"
          />
        </div>

        {/* Sort By */}
        <div className="form-control min-w-[180px]">
          <label className="label">
            <span className="label-text text-sm">並び順</span>
          </label>
          <Select
            options={sortOptions}
            value={sortBy || ''}
            onChange={(e) => setSortBy((e.target.value as 'priority' | 'dueDate') || null)}
            className="select-sm"
          />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={clearFilters}
            aria-label="すべてのフィルターをクリア"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            クリア
          </button>
        )}
      </div>
    </div>
  );
}
