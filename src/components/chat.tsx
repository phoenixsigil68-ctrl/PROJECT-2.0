
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatAction, type ChatState } from '@/app/actions';
import { Loader2, Send, Bot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const initialChatState: ChatState = {
  messages: [],
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      <span className="sr-only">સંદેશ મોકલો</span>
    </Button>
  );
}

export function Chat() {
  const [state, formAction, isPending] = useActionState(chatAction, initialChatState);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
        toast({ variant: 'destructive', title: 'Chat Error', description: state.error });
    }
  }, [state.error, toast]);

  useEffect(() => {
    if (!isPending) {
      formRef.current?.reset();
      inputRef.current?.focus();
    }
  }, [isPending]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [state.messages]);


  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot />
          વિદ્યાર્થી મિત્ર
        </CardTitle>
        <CardDescription>તમારા અભ્યાસમાં મદદ માટે અહીં પૂછો.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {state.messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.role === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p>{message.content}</p>
              </div>
            ))}
             {isPending && (
                <div className="flex items-center space-x-2">
                    <div className="flex-shrink-0 p-2 bg-muted rounded-full">
                        <Bot className="h-5 w-5"/>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form ref={formRef} action={formAction} className="flex w-full items-center space-x-2">
          <Input name="message" ref={inputRef} placeholder="તમારો પ્રશ્ન લખો..." className="flex-1" autoComplete="off" />
          <SubmitButton />
        </form>
      </CardFooter>
    </Card>
  );
}
