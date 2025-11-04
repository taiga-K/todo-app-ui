import type { ReactNode } from 'react';
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import type { Todo } from '@/features/kanban/hooks/useTodosQuery';
import { TodoCard } from '@/features/kanban/cards/TodoCard';

interface KanbanDragContextProps {
  children: ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
}

export function KanbanDragContext({ children, onDragEnd }: KanbanDragContextProps) {
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const todo = event.active.data.current?.todo as Todo;
    setActiveTodo(todo);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTodo(null);
    onDragEnd(event);
  };

  const handleDragCancel = () => {
    setActiveTodo(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {children}
      <DragOverlay>
        {activeTodo ? (
          <div className="opacity-80 rotate-3 scale-105">
            <TodoCard todo={activeTodo} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
