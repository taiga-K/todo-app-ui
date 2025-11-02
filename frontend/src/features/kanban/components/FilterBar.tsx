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
    { value: '', label: 'Default' },
    { value: 'priority', label: 'Priority' },
    { value: 'dueDate', label: 'Due Date' },
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    ...Object.entries(PRIORITY_LABELS).map(([value, label]) => ({ value, label })),
  ];

  return (
    <div className="bg-base-100 rounded-lg shadow-sm border border-base-300 p-4">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Search */}
        <div className="form-control flex-1 min-w-[200px]">
          <label className="label">
            <span className="label-text text-sm">Search</span>
          </label>
          <Input
            type="text"
            placeholder="Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-sm"
          />
        </div>

        {/* Priority Filter */}
        <div className="form-control min-w-[180px]">
          <label className="label">
            <span className="label-text text-sm">Priority</span>
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
            <span className="label-text text-sm">Sort By</span>
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
            aria-label="Clear all filters"
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
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
