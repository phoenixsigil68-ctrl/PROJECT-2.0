'use server';

/**
 * @fileOverview A simple conversational AI flow for a student assistant chatbot.
 *
 * - chat - A function that takes the chat history and returns a response from the AI.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {generate} from 'genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async ({history}) => {
    const systemInstruction = {
      role: 'system',
      content: `You are a friendly and helpful AI assistant named "વિદ્યાર્થી મિત્ર" (Student Friend) for an educational platform called "વિદ્યાર્થી સહાયક" (Student Helper) for students in Gujarat, India (grades 9-12).

Your primary language for conversation should be Gujarati, but you can use English for technical terms if needed.

Your role is to help students with their studies. You can answer questions about the subjects available on the platform (Maths, Science, Physics, Chemistry), explain concepts, and help them with their homework.

Be encouraging, patient, and supportive.`,
    };

    const response = await generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: {
        messages: [systemInstruction, ...history],
      },
      config: {
        temperature: 0.7,
      },
    });

    return response.text;
  }
);
