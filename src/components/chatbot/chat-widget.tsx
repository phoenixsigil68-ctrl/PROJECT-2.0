'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { MessageSquare, Bot, User, Send, Loader2 } from 'lucide-react';
import { useActionState, useRef, useEffect } from 'react';
import { chatAction, type ChatState } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFormStatus } from 'react-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const initialState: ChatState = {
  messages: [{ role: 'model', content: 'નમસ્કાર! હું તમારો વિદ્યાર્થી મિત્ર છું. હું તમને કેવી રીતે મદદ કરી શકું?' }],
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <Send />}
    </Button>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(chatAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    if (!isPending) {
        formRef.current?.reset();
    }
  }, [state.messages, isPending]);

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-50"
        size="icon"
        onClick={() => setIsOpen(true)}
      >
        <Bot size={32} />
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:w-[540px] flex flex-col p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <Bot className="text-primary" />
              વિદ્યાર્થી મિત્ર
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-4 space-y-6">
              {state.messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                  {message.role === 'model' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback><Bot size={20} /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                   {message.role === 'user' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback><User size={20} /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
               {isPending && (
                <div className="flex items-start gap-3">
                   <Avatar className="w-8 h-8">
                      <AvatarFallback><Bot size={20} /></AvatarFallback>
                    </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-muted text-muted-foreground">
                    <Loader2 className="animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <SheetFooter className="p-4 border-t bg-background">
            <form
              ref={formRef}
              action={formAction}
              className="flex w-full items-center space-x-2"
            >
              <Input
                id="message"
                name="message"
                placeholder="તમારો પ્રશ્ન અહીં લખો..."
                className="flex-1"
                autoComplete="off"
                disabled={isPending}
              />
              <SubmitButton />
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
