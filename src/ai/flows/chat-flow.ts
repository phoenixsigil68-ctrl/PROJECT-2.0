'use server';

/**
 * @fileOverview A simple conversational AI flow for a student assistant chatbot.
 *
 * - chat - A function that takes a user's message and returns a response from the AI.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe("The user's message to the chatbot."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: ChatInputSchema},
  output: {format: 'text'},
  prompt: `You are a friendly and helpful AI assistant named "વિદ્યાર્થી મિત્ર" (Student Friend) for an educational platform called "વિદ્યાર્થી સહાયક" (Student Helper) for students in Gujarat, India (grades 9-12).

Your primary language for conversation should be Gujarati, but you can use English for technical terms if needed.

Your role is to help students with their studies. You can answer questions about the subjects available on the platform (Maths, Science, Physics, Chemistry), explain concepts, and help them with their homework. Be encouraging, patient, and supportive.

The user has asked the following question:
"{{message}}"

Provide a direct and helpful answer.`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
