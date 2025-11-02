import type { components } from '@/generated/todo';

export type TodoStatus = components['schemas']['TodoStatus'];
export type TodoPriority = components['schemas']['TodoPriority'];

export interface ColumnMeta {
  key: TodoStatus;
  displayName: string;
  order: number;
  description?: string;
  isDefault?: boolean;
}

export const DEFAULT_COLUMNS: ColumnMeta[] = [
  {
    key: 'backlog',
    displayName: 'Backlog',
    order: 0,
    description: 'Tasks to be started',
    isDefault: true,
  },
  {
    key: 'in_progress',
    displayName: 'In Progress',
    order: 1,
    description: 'Currently working on',
    isDefault: true,
  },
  {
    key: 'done',
    displayName: 'Done',
    order: 2,
    description: 'Completed tasks',
    isDefault: true,
  },
];

export const PRIORITY_LABELS: Record<TodoPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

export const PRIORITY_COLORS: Record<TodoPriority, string> = {
  low: 'badge-info',
  medium: 'badge-success',
  high: 'badge-warning',
  urgent: 'badge-error',
};
