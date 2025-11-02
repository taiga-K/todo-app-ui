import * as React from 'react';
import { cn } from '@/lib/utils';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <>
      {open && (
        <dialog className="modal modal-open" onClick={() => onOpenChange(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => onOpenChange(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}

export function DialogContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-4', className)}>{children}</div>;
}

export function DialogHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

export function DialogTitle({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-lg font-bold', className)}>{children}</h3>;
}

export function DialogFooter({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('modal-action', className)}>{children}</div>;
}
