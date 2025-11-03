import type { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { ColumnMeta } from '@/features/kanban/constants/status';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  column: ColumnMeta;
  children: ReactNode;
  count?: number;
  items: string[]; // Array of todo IDs for sortable context
}

export function KanbanColumn({ column, children, count, items }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.key,
    data: {
      type: 'column',
      status: column.key,
    },
  });

  return (
    <div className="flex flex-col min-w-[300px] max-w-[400px] flex-1">
      <div className="bg-base-200 rounded-t-lg p-3 border-b border-base-300">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">{column.displayName}</h2>
          {count !== undefined && (
            <span className="badge badge-neutral badge-sm">{count}</span>
          )}
        </div>
        {column.description && (
          <p className="text-xs text-base-content/60 mt-1">{column.description}</p>
        )}
      </div>

      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            'flex-1 bg-base-100 rounded-b-lg p-3 space-y-3',
            'min-h-[400px] max-h-[calc(100vh-250px)] overflow-y-auto',
            'transition-colors',
            isOver && 'bg-primary/10 ring-2 ring-primary'
          )}
        >
          {children}
        </div>
      </SortableContext>
    </div>
  );
}
