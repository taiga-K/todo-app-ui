import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import type { Todo } from '@/features/kanban/hooks/useTodosQuery';
import type { TodoFormData, ValidationError } from '@/features/kanban/lib/todoSchema';
import { validateTodoForm, getDefaultFormData } from '@/features/kanban/lib/todoSchema';
import { DEFAULT_COLUMNS, PRIORITY_LABELS } from '@/features/kanban/constants/status';
import type { TodoStatus } from '@/features/kanban/constants/status';

interface TodoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TodoFormData) => void;
  initialData?: Todo;
  defaultStatus?: TodoStatus;
  isLoading?: boolean;
}

export function TodoFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  defaultStatus = 'backlog',
  isLoading = false,
}: TodoFormDialogProps) {
  const [formData, setFormData] = useState<TodoFormData>(
    initialData
      ? {
          title: initialData.title,
          description: initialData.description || '',
          status: initialData.status,
          priority: initialData.priority || undefined,
          dueDate: initialData.dueDate || undefined,
          assigneeId: initialData.assignee?.id,
        }
      : getDefaultFormData(defaultStatus)
  );

  const [errors, setErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    if (open) {
      setFormData(
        initialData
          ? {
              title: initialData.title,
              description: initialData.description || '',
              status: initialData.status,
              priority: initialData.priority || undefined,
              dueDate: initialData.dueDate || undefined,
              assigneeId: initialData.assignee?.id,
            }
          : getDefaultFormData(defaultStatus)
      );
      setErrors([]);
    }
  }, [open, initialData, defaultStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateTodoForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  const getError = (field: string) => errors.find((e) => e.field === field)?.message;

  const statusOptions = DEFAULT_COLUMNS.map((col) => ({
    value: col.key,
    label: col.displayName,
  }));

  const priorityOptions = [
    { value: '', label: 'なし' },
    ...Object.entries(PRIORITY_LABELS).map(([value, label]) => ({ value, label })),
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialData ? 'Todoを編集' : '新しいTodoを作成'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  タイトル <span className="text-error">*</span>
                </span>
              </label>
              <Input
                type="text"
                placeholder="Todoのタイトルを入力"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={getError('title') ? 'input-error' : ''}
              />
              {getError('title') && (
                <label className="label">
                  <span className="label-text-alt text-error">{getError('title')}</span>
                </label>
              )}
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">説明</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="説明を入力（任意）"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {getError('description') && (
                <label className="label">
                  <span className="label-text-alt text-error">{getError('description')}</span>
                </label>
              )}
            </div>

            {/* Status */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">ステータス</span>
              </label>
              <Select
                options={statusOptions}
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as TodoStatus })
                }
              />
            </div>

            {/* Priority */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">優先度</span>
              </label>
              <Select
                options={priorityOptions}
                value={formData.priority || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: (e.target.value as TodoFormData['priority']) || undefined,
                  })
                }
              />
            </div>

            {/* Due Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">期限日</span>
              </label>
              <Input
                type="date"
                value={formData.dueDate ? formData.dueDate.split('T')[0] : ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dueDate: e.target.value ? new Date(e.target.value).toISOString() : undefined,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  保存中...
                </>
              ) : initialData ? (
                '更新'
              ) : (
                '作成'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
