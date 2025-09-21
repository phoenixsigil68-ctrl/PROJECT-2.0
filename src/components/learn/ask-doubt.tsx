'use client';

import { useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { AskDoubtState } from '@/app/actions';
import type { Chapter } from '@/lib/types';
import { HelpCircle, Loader2, Send } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface AskDoubtProps {
  chapter: Chapter;
  formAction: (payload: FormData) => void;
  state: AskDoubtState;
  isPending: boolean;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          પૂછી રહ્યું છે...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          પ્રશ્ન પૂછો
        </>
      )}
    </Button>
  );
}

export function AskDoubt({ chapter, formAction, state, isPending }: AskDoubtProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isPending) {
        formRef.current?.reset();
    }
  }, [isPending]);

  return (
    <div>
      <h3 className="text-xl font-bold font-headline mb-3 text-primary flex items-center">
        <HelpCircle className="mr-3 h-6 w-6" />
        શંકા પૂછો
      </h3>
      <p className="mb-4 text-muted-foreground text-sm">
        આ પ્રકરણ વિશે કોઈ પ્રશ્ન છે? અહીં પૂછો અને તરત જ AI-સંચાલિત જવાબ મેળવો.
      </p>

      <form ref={formRef} key={state.formKey} action={formAction} className="flex flex-col items-start space-y-4">
        <input type="hidden" name="chapterContent" value={chapter.content} />
        <Textarea
          name="question"
          placeholder="ઉદાહરણ: 'સંમેય અને અસંમેય સંખ્યાઓ વચ્ચે શું તફાવત છે?'"
          className="bg-background"
          rows={3}
          required
        />
        <SubmitButton />
      </form>

      {isPending && state.question && (
        <Card className="mt-4 bg-muted/50">
          <CardContent className="p-4 space-y-2">
            <p className="font-semibold text-sm text-primary">{state.question}</p>
            <div className="flex items-center text-muted-foreground text-sm">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>AI જવાબ તૈયાર કરી રહ્યું છે...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {state.answer && !isPending && (
         <Card className="mt-6 bg-background shadow-inner">
          <CardContent className="p-4 space-y-3">
             <p className="font-semibold text-sm text-primary">{state.question}</p>
             <div className="border-t pt-3 mt-3">
                 <p className="text-sm whitespace-pre-wrap leading-relaxed text-foreground/90">{state.answer}</p>
             </div>
          </CardContent>
        </Card>
      )}

      {state.error && (
        <Card className="mt-4 bg-destructive/10 border-destructive">
          <CardContent className="p-4">
            <p className="text-sm text-destructive-foreground">{state.error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
