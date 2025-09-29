'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Chat } from '@/components/chat';
import { MessageCircle } from 'lucide-react';


export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90 transition-transform hover:scale-110"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-8 w-8" />
          <span className="sr-only">Open Chat</span>
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[512px] p-0 ">
           <DialogHeader className="sr-only">
            <DialogTitle>વિદ્યાર્થી મિત્ર</DialogTitle>
            <DialogDescription>તમારા અભ્યાસમાં મદદ માટે અહીં પૂછો.</DialogDescription>
           </DialogHeader>
           {/* The Chat component includes its own header and footer, so we can render it directly */}
           <Chat />
        </DialogContent>
      </Dialog>
    </>
  );
}
