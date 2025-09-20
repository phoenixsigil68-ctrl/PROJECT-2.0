'use server';

/**
 * @fileOverview An AI flow for summarizing chapter content.
 *
 * - summarizeContent - A function that takes chapter content and returns a concise summary.
 * - SummarizeContentInput - The input type for the summarizeContent function.
 * - SummarizeContentOutput - The return type for the summarizeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContentInputSchema = z.object({
  chapterContent: z.string().describe('The full text content of the chapter to be summarized.'),
});
export type SummarizeContentInput = z.infer<typeof SummarizeContentInputSchema>;

export type SummarizeContentOutput = string;

export async function summarizeContent(input: SummarizeContentInput): Promise<SummarizeContentOutput> {
  return summarizeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeContentPrompt',
  input: {schema: SummarizeContentInputSchema},
  output: {format: 'text'},
  prompt: `You are an expert educator, skilled at simplifying complex topics for students (grades 9-12) in Gujarat.

Your task is to create a concise summary of the following chapter content.

- The summary MUST be in simple, clear Gujarati.
- It should cover the main points and key takeaways of the chapter.
- Use bullet points to make the summary easy to read and digest.
- Start with a brief introductory sentence.

Chapter Content:
---
{{{chapterContent}}}
---
`,
});

const summarizeContentFlow = ai.defineFlow(
  {
    name: 'summarizeContentFlow',
    inputSchema: SummarizeContentInputSchema,
    outputSchema: z.string(),
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
