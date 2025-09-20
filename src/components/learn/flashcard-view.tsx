'use client';

import { useState } from 'react';
import type { Chapter } from '@/lib/types';
import { createFlashcardsAction, type CreateFlashcardsState } from '@/app/actions';
import { Button } from '../ui/button';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { useToast } from '@/hooks/use-toast';
import { FlashcardCarousel } from './flashcard-carousel';

export function FlashcardView({ chapter }: { chapter: Chapter }) {
  const [state, setState] = useState<CreateFlashcardsState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setState(null);
    const result = await createFlashcardsAction(chapter.content);
    setIsLoading(false);
    setState(result);

    if (!result.success) {
      toast({
        variant: 'destructive',
        title: 'ભૂલ',
        description: result.message,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI ફ્લેશકાર્ડ જનરેટર</CardTitle>
        <CardDescription>
          આ પ્રકરણના મુખ્ય મુદ્દાઓમાંથી ઝડપથી શીખવા અને યાદ રાખવા માટે AI નો ઉપયોગ કરીને ફ્લેશકાર્ડ્સ બનાવો.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6">
        {!state?.data && (
           <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                બનાવી રહ્યું છે...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                ફ્લેશકાર્ડ્સ બનાવો
              </>
            )}
          </Button>
        )}

        {isLoading && (
            <div className="flex flex-col items-center text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <p>AI તમારા માટે ફ્લેશકાર્ડ્સ તૈયાર કરી રહ્યું છે...</p>
            </div>
        )}

        {state?.success && state.data && (
          <div className="w-full">
            <FlashcardCarousel flashcards={state.data.flashcards} />
             <div className="text-center mt-6">
                 <Button onClick={handleGenerate} disabled={isLoading} variant="outline">
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ફરીથી બનાવી રહ્યું છે...
                    </>
                    ) : (
                    <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        નવા ફ્લેશકાર્ડ્સ બનાવો
                    </>
                    )}
                </Button>
            </div>
          </div>
        )}

        {!isLoading && state && !state.success && (
          <Alert variant="destructive" className="w-full max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>ઓહ ના!</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !state && (
             <div className="flex items-center justify-center h-40 text-muted-foreground text-center p-4 border-2 border-dashed rounded-lg w-full">
              <p>ફ્લેશકાર્ડ્સ બનાવવા માટે બટન પર ક્લિક કરો.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
