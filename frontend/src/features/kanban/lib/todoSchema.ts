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
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (data.title.length > 120) {
    errors.push({ field: 'title', message: 'Title must be 120 characters or less' });
  }

  // Description validation
  if (data.description && data.description.length > 2000) {
    errors.push({ field: 'description', message: 'Description must be 2000 characters or less' });
  }

  // Due date validation
  if (data.dueDate) {
    const date = new Date(data.dueDate);
    if (isNaN(date.getTime())) {
      errors.push({ field: 'dueDate', message: 'Invalid date format' });
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
