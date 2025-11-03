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

// Note: All columns have isDefault: true to prepare for future custom column support
// This allows distinguishing between system-defined columns and user-created custom columns
export const DEFAULT_COLUMNS: ColumnMeta[] = [
  {
    key: 'backlog',
    displayName: 'バックログ',
    order: 0,
    description: '開始予定のタスク',
    isDefault: true,
  },
  {
    key: 'in_progress',
    displayName: '進行中',
    order: 1,
    description: '作業中のタスク',
    isDefault: true,
  },
  {
    key: 'done',
    displayName: '完了',
    order: 2,
    description: '完了したタスク',
    isDefault: true,
  },
];

export const PRIORITY_LABELS: Record<TodoPriority, string> = {
  low: '低',
  medium: '中',
  high: '高',
  urgent: '緊急',
};

export const PRIORITY_COLORS: Record<TodoPriority, string> = {
  low: 'badge-info',
  medium: 'badge-success',
  high: 'badge-warning',
  urgent: 'badge-error',
};
