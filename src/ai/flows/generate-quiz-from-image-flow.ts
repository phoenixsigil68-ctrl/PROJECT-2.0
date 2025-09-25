
'use server';

/**
 * @fileOverview AI-powered quiz question generator from an image.
 *
 * - generateQuizFromImage - A function that generates multiple-choice questions based on an uploaded image.
 * - GenerateQuizFromImageInput - The input type for the generateQuizFromImage function.
 * - GenerateQuizFromImageOutput - The return type for the generateQuizFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { GenerateQuizQuestionsOutput } from './generate-quiz-questions';
import { GenerateQuizQuestionsOutputSchema } from '@/ai/schemas';

const GenerateQuizFromImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "An image of a textbook page, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateQuizFromImageInput = z.infer<typeof GenerateQuizFromImageInputSchema>;

export type GenerateQuizFromImageOutput = GenerateQuizQuestionsOutput;

export async function generateQuizFromImage(input: GenerateQuizFromImageInput): Promise<GenerateQuizFromImageOutput> {
  return generateQuizFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizFromImagePrompt',
  input: {schema: GenerateQuizFromImageInputSchema},
  output: {schema: GenerateQuizQuestionsOutputSchema},
  prompt: `You are an expert educator creating quizzes. Analyze the provided image of a textbook page and generate 10 multiple-choice questions from its content.

The questions should be in Gujarati.
Each question must have 4 options.
Indicate the correct answer for each question.

Your response must be a JSON object with a "questions" array. Each object in the array should have "question", "options" and "correctAnswerIndex" fields.

Image Content:
{{media url=imageDataUri}}
`,
  config: {
    safetySettings: [
        {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
        },
        {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
        },
        {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_ONLY_HIGH',
        },
        {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_ONLY_HIGH',
        }
    ]
  }
});

const generateQuizFromImageFlow = ai.defineFlow(
  {
    name: 'generateQuizFromImageFlow',
    inputSchema: GenerateQuizFromImageInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
