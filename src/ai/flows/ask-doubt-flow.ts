'use server';

/**
 * @fileOverview A contextual AI flow for answering student doubts based on chapter content.
 *
 * - askDoubt - A function that takes chapter content and a user's question, returning a contextual answer.
 * - AskDoubtInput - The input type for the askDoubt function.
 * - AskDoubtOutput - The return type for the askDoubt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskDoubtInputSchema = z.object({
  chapterContent: z.string().describe('The full text content of the chapter the student is studying.'),
  question: z.string().describe('The specific question the student has about the chapter content.'),
});
export type AskDoubtInput = z.infer<typeof AskDoubtInputSchema>;

export type AskDoubtOutput = string;

export async function askDoubt(input: AskDoubtInput): Promise<AskDoubtOutput> {
  return askDoubtFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askDoubtPrompt',
  input: {schema: AskDoubtInputSchema},
  output: {format: 'text'},
  prompt: `You are an expert and friendly tutor explaining a concept to a student in Gujarati.

The student is currently studying a chapter with the following content:
---
{{{chapterContent}}}
---

The student has asked the following question:
"{{{question}}}"

Your task is to provide a clear, simple, and encouraging answer to the student's question.
- Your answer MUST be in Gujarati.
- Base your answer ONLY on the provided chapter content. Do not introduce outside information.
- If the question cannot be answered from the content, politely state that the answer is not in this chapter's material.
- Keep the tone supportive and helpful.
`,
});

const askDoubtFlow = ai.defineFlow(
  {
    name: 'askDoubtFlow',
    inputSchema: AskDoubtInputSchema,
    outputSchema: z.string(),
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
