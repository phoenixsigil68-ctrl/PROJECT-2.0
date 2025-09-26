'use server';

/**
 * @fileOverview A Speech-to-Text (STT) flow that transcribes audio to text.
 *
 * - speechToText - A function that takes audio and returns the transcribed text.
 * - SpeechToTextInput - The input type for the speechToText function.
 * - SpeechToTextOutput - The return type for the speechToText function.
 */

import {ai} from '@/ai/genkit';
import {generate} from 'genkit';
import type { z } from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import { SpeechToTextInputSchema, SpeechToTextOutputSchema } from '@/ai/schemas';


export type SpeechToTextInput = z.infer<typeof SpeechToTextInputSchema>;
export type SpeechToTextOutput = z.infer<typeof SpeechToTextOutputSchema>;

export async function speechToText(input: SpeechToTextInput): Promise<SpeechToTextOutput> {
  return speechToTextFlow(input);
}

const speechToTextFlow = ai.defineFlow(
  {
    name: 'speechToTextFlow',
    inputSchema: SpeechToTextInputSchema,
    outputSchema: SpeechToTextOutputSchema,
  },
  async ({audioDataUri}) => {
    const model = googleAI.model('gemini-2.5-flash');
    const {text} = await generate({
      model,
      prompt: {
          messages: [
            {
                role: 'user',
                content: [
                    { media: { url: audioDataUri } },
                    { text: 'Please transcribe the following audio in Gujarati.' },
                ]
            }
          ]
      }
    });

    return text;
  }
);
