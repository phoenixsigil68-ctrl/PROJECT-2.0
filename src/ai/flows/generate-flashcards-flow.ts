'use server';

/**
 * @fileOverview AI-powered flashcard generator for students.
 *
 * - generateFlashcards - A function that generates flashcards based on chapter content.
 * - GenerateFlashcardsInput - The input type for the generateFlashcards function.
 * - GenerateFlashcardsOutput - The return type for the generateFlashcards function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFlashcardsInputSchema = z.object({
  chapterContent: z.string().describe('The full text content of the chapter.'),
  count: z.number().int().min(1).max(20).default(10).describe('The number of flashcards to generate.'),
});
export type GenerateFlashcardsInput = z.infer<typeof GenerateFlashcardsInputSchema>;

const FlashcardSchema = z.object({
  term: z.string().describe('The key term or concept in Gujarati.'),
  definition: z.string().describe('The definition or explanation of the term in simple Gujarati.'),
});

const GenerateFlashcardsOutputSchema = z.object({
  flashcards: z.array(FlashcardSchema).describe('An array of generated flashcards.'),
});
export type GenerateFlashcardsOutput = z.infer<typeof GenerateFlashcardsOutputSchema>;

export async function generateFlashcards(input: GenerateFlashcardsInput): Promise<GenerateFlashcardsOutput> {
  return generateFlashcardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFlashcardsPrompt',
  input: {schema: GenerateFlashcardsInputSchema},
  output: {schema: GenerateFlashcardsOutputSchema},
  prompt: `You are an expert educator creating learning materials in Gujarati. Your task is to generate {{count}} flashcards from the following chapter content.

Each flashcard should consist of a key 'term' and a simple 'definition'. Both the term and definition must be in Gujarati.

Focus on the most important vocabulary, concepts, and formulas in the text.

Chapter Content:
---
{{{chapterContent}}}
---

Your response must be a JSON object with a "flashcards" array.
`,
});

const generateFlashcardsFlow = ai.defineFlow(
  {
    name: 'generateFlashcardsFlow',
    inputSchema: GenerateFlashcardsInputSchema,
    outputSchema: GenerateFlashcardsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
