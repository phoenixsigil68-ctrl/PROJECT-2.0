'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { summarizeContentAction, type SummarizeContentState } from '@/app/actions';
import type { Chapter } from '@/lib/types';
import { Loader2, Pilcrow, Sparkles, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function ContentSummarizer({ chapter }: { chapter: Chapter }) {
  const [state, setState] = useState<SummarizeContentState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setState(null);
    const result = await summarizeContentAction(chapter.content);
    setIsLoading(false);
    setState(result);
  };

  return (
    <div>
      <h3 className="text-xl font-bold font-headline mb-3 text-primary flex items-center">
        <Pilcrow className="mr-3 h-6 w-6" />
        AI સારાંશ
      </h3>
      <p className="mb-4 text-muted-foreground text-sm">
        આખા પ્રકરણનો મુખ્ય સારાંશ મેળવવા માટે નીચેનું બટન દબાવો.
      </p>

      <Button onClick={handleGenerateSummary} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            તૈયાર કરી રહ્યું છે...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            સારાંશ બનાવો
          </>
        )}
      </Button>

      {isLoading && (
         <div className="flex items-center text-muted-foreground text-sm mt-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>AI તમારા માટે સારાંશ તૈયાર કરી રહ્યું છે...</span>
        </div>
      )}

      {state?.summary && !isLoading && (
         <Card className="mt-4 bg-background shadow-inner">
          <CardContent className="p-4">
             <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                {state.summary}
             </div>
          </CardContent>
        </Card>
      )}

      {state?.error && !isLoading && (
         <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>ઓહ ના!</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
      )}
    </div>
  );
}
