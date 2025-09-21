'use client';

import { useState, useRef, useEffect } from 'react';
import { useActionState, useFormStatus } from 'react-dom';
import { createQuizFromImageAction, type CreateQuizFromImageState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { UploadCloud, Sparkles, Loader2, Lightbulb, AlertCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const initialState: CreateQuizFromImageState = {
  formKey: 0,
  success: false,
  message: '',
  data: null,
};

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled} size="lg">
      <Sparkles className="mr-2 h-4 w-4" />
      {pending ? 'ક્વિઝ બનાવી રહ્યું છે...' : 'ક્વિઝ બનાવો'}
    </Button>
  );
}

export function ImageQuizGenerator() {
  const [state, formAction, isPending] = useActionState(createQuizFromImageAction, initialState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !isPending) {
      toast({
        variant: state.success ? 'default' : 'destructive',
        title: state.success ? 'સફળતા' : 'ભૂલ',
        description: state.message,
      });
    }
  }, [state.formKey, state.message, state.success, isPending, toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
            variant: 'destructive',
            title: 'ફાઇલ ખૂબ મોટી છે',
            description: 'કૃપા કરીને 4MB કરતા નાની છબી અપલોડ કરો.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        const dataUri = e.target?.result as string;
        setPreviewUrl(dataUri);
        setImageDataUri(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setImageDataUri('');
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }


  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>૧. છબી અપલોડ કરો</CardTitle>
          <CardDescription>
            તમારા પાઠ્યપુસ્તક, નોંધો, અથવા કોઈપણ લખાણવાળા પૃષ્ઠની સ્પષ્ટ છબી પસંદ કરો.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <input type="hidden" name="imageDataUri" value={imageDataUri} />
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80"
                >
                  {previewUrl ? (
                    <>
                      <Image src={previewUrl} alt="Image preview" fill className="object-contain rounded-lg p-2" />
                      <button 
                        type="button" 
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 shadow-md hover:bg-destructive/80"
                        aria-label="Remove image"
                        >
                        <X size={16}/>
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-center text-muted-foreground">
                        <span className="font-semibold">અપલોડ કરવા માટે ક્લિક કરો</span> અથવા છબીને અહીં ખેંચીને મૂકો
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, JPEG (મહત્તમ 4MB)</p>
                    </div>
                  )}
                  <Input 
                    id="dropzone-file" 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/jpg"
                    disabled={isPending}
                  />
                </label>
              </div>
              <div className="text-center">
                <SubmitButton disabled={!previewUrl || isPending} />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="bg-secondary/50">
        <CardHeader>
          <CardTitle>૨. પરિણામ</CardTitle>
          <CardDescription>
            તમારી ક્વિઝ અહીં દેખાશે.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPending && (
             <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin mb-4" />
                <p className="text-lg">AI તમારી ક્વિઝ બનાવી રહ્યું છે...</p>
                <p>આમાં થોડો સમય લાગી શકે છે.</p>
            </div>
          )}

          {state.success && state.data && (
             <div className="space-y-6">
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>ક્વિઝ તૈયાર છે!</AlertTitle>
                <AlertDescription>AI દ્વારા બનાવેલ નવા પ્રશ્નો નીચે મુજબ છે.</AlertDescription>
              </Alert>
              <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4">
              {state.data.questions.map((q, index) => (
                <div key={index} className="p-4 border rounded-lg bg-background shadow-sm">
                  <p className="font-semibold mb-2">
                    {index + 1}. {q.question}
                  </p>
                  <RadioGroup disabled>
                    {q.options.map((option, i) => (
                      <div
                        key={i}
                        className={`flex items-center space-x-2 p-2 rounded-md ${
                          i === q.correctAnswerIndex ? 'bg-green-500/10' : ''
                        }`}
                      >
                        <RadioGroupItem value={String(i)} id={`gen-q${index}-opt${i}`} checked={i === q.correctAnswerIndex} />
                        <Label
                          htmlFor={`gen-q${index}-opt${i}`}
                          className={`${i === q.correctAnswerIndex ? 'font-bold text-primary' : ''}`}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              </div>
            </div>
          )}

           {!isPending && state.message && !state.success && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>એક ભૂલ આવી</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
           )}

           {!isPending && !state.data && (
             <div className="flex items-center justify-center h-64 text-muted-foreground text-center p-4 border-2 border-dashed rounded-lg">
              <p>ક્વિઝ બનાવવા માટે કૃપા કરીને એક છબી અપલોડ કરો.</p>
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
