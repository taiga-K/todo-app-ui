import type { TodoStatus, TodoPriority } from '@/features/kanban/constants/status';

export interface TodoFormData {
  title: string;
  description?: string;
  status: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  assigneeId?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export function validateTodoForm(data: Partial<TodoFormData>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Title validation
  if (!data.title?.trim()) {
    errors.push({ field: 'title', message: 'タイトルは必須です' });
  } else if (data.title.length > 120) {
    errors.push({ field: 'title', message: 'タイトルは120文字以内で入力してください' });
  }

  // Description validation
  if (data.description && data.description.length > 2000) {
    errors.push({ field: 'description', message: '説明は2000文字以内で入力してください' });
  }

  // Due date validation
  if (data.dueDate) {
    const date = new Date(data.dueDate);
    if (isNaN(date.getTime())) {
      errors.push({ field: 'dueDate', message: '無効な日付形式です' });
    }
  }

  return errors;
}

export function getDefaultFormData(status: TodoStatus = 'backlog'): TodoFormData {
  return {
    title: '',
    description: '',
    status,
    priority: undefined,
    dueDate: undefined,
    assigneeId: undefined,
  };
}
