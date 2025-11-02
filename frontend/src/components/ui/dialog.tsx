import * as React from 'react';
import { cn } from '@/lib/utils';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContextValue {
  dialogId: string;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const dialogId = React.useId();

  return (
    <DialogContext.Provider value={{ dialogId }}>
      {open && (
        <dialog
          className="modal modal-open"
          onClick={() => onOpenChange(false)}
          aria-labelledby={`${dialogId}-title`}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => onOpenChange(false)}>close</button>
          </form>
        </dialog>
      )}
    </DialogContext.Provider>
  );
}

export function DialogContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-4', className)}>{children}</div>;
}

export function DialogHeader({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

export function DialogTitle({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) {
  const context = React.useContext(DialogContext);
  const titleId = context ? `${context.dialogId}-title` : undefined;

  return (
    <h3 id={titleId} className={cn('text-lg font-bold', className)}>
      {children}
    </h3>
  );
}

export function DialogFooter({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('modal-action', className)}>{children}</div>;
}
