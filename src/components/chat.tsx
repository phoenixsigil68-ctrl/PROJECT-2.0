
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatAction, speechToTextAction, textToSpeechAction, type ChatState } from '@/app/actions';
import { Loader2, Mic, Send, Bot, User, Volume2, Square } from 'lucide-react';
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
  const [isRecording, setIsRecording] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { toast } = useToast();

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

  const handleMicClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      const audioChunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          try {
            const transcription = await speechToTextAction(base64Audio);
             if (inputRef.current) {
               inputRef.current.value = transcription;
             }
          } catch (e) {
            toast({ variant: 'destructive', title: 'ભૂલ', description: 'ઓડિયોનું લખાણ કરવામાં નિષ્ફળ.' });
          }
        };
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone access denied:", error);
      toast({ variant: 'destructive', title: 'માઇક્રોફોન ભૂલ', description: 'માઇક્રોફોનની ઍક્સેસ નકારવામાં આવી.' });
    }
  };
  
  const handlePlayAudio = async (text: string, messageId: string) => {
    if (playingAudio === messageId) {
      setPlayingAudio(null);
      return;
    }
    setPlayingAudio(messageId);
    try {
      const audioDataUri = await textToSpeechAction(text);
      if (audioDataUri) {
        const audio = new Audio(audioDataUri);
        audio.play();
        audio.onended = () => setPlayingAudio(null);
      } else {
        setPlayingAudio(null);
        toast({ variant: 'destructive', title: 'ભૂલ', description: 'ઓડિયો ચલાવવામાં નિષ્ફળ.' });
      }
    } catch (e) {
      setPlayingAudio(null);
      toast({ variant: 'destructive', title: 'ભૂલ', description: 'ઓડિયો બનાવવામાં નિષ્ફળ.' });
    }
  };

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
                <div className="flex items-center gap-2">
                   {message.role === 'model' && (
                     <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handlePlayAudio(message.content, `msg-${index}`)}>
                       {playingAudio === `msg-${index}` ? <Loader2 className="h-4 w-4 animate-spin"/> : <Volume2 className="h-4 w-4" />}
                     </Button>
                   )}
                  <p>{message.content}</p>
                </div>
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
          <Button type="button" size="icon" variant={isRecording ? "destructive" : "outline"} onClick={handleMicClick}>
            {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            <span className="sr-only">{isRecording ? 'રેકોર્ડિંગ બંધ કરો' : 'બોલવાનું શરૂ કરો'}</span>
          </Button>
          <SubmitButton />
        </form>
      </CardFooter>
    </Card>
  );
}
