import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Todo } from '@/features/kanban/hooks/useTodosQuery';
import { TodoCard } from './TodoCard';
import { cn } from '@/lib/utils';

interface DraggableTodoCardProps {
  todo: Todo;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function DraggableTodoCard({ todo, onEdit, onDelete }: DraggableTodoCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
    data: {
      todo,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'touch-none',
        isDragging && 'opacity-50'
      )}
      {...attributes}
      {...listeners}
    >
      <TodoCard todo={todo} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}
