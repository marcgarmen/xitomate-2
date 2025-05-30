'use client';
import { PropsWithChildren } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function CenteredCard({
  open,
  onOpenChange,
  children,
  className = '',
}: PropsWithChildren<{ open: boolean; onOpenChange: (v: boolean) => void; className?: string }>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={
          'rounded-2xl p-8 w-full max-w-md shadow-xl ' + className
        }
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}