'use server';

/**
 * @fileOverview AI-powered quiz question generator for educators.
 *
 * - generateQuizQuestions - A function that generates multiple-choice questions based on the selected class, subject, and chapter.
 * - GenerateQuizQuestionsInput - The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput - The return type for the generateQuizQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { GenerateQuizQuestionsOutputSchema } from '@/ai/schemas';

const GenerateQuizQuestionsInputSchema = z.object({
  gradeLevel: z.enum(['9', '10', '11', '12']).describe('The grade level of the quiz.'),
  subject: z.string().describe('The subject of the quiz.'),
  chapter: z.string().describe('The chapter of the quiz.'),
  numberOfQuestions: z.number().int().min(1).max(20).default(5).describe('The number of questions to generate.'),
});
export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;
export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;


export async function generateQuizQuestions(input: GenerateQuizQuestionsInput): Promise<GenerateQuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: {schema: GenerateQuizQuestionsInputSchema},
  output: {schema: GenerateQuizQuestionsOutputSchema},
  prompt: `You are an expert educator specializing in creating quizzes for students in grades 9-12.

You will generate {{numberOfQuestions}} multiple-choice questions for a quiz based on the following information:

Grade Level: {{gradeLevel}}
Subject: {{subject}}
Chapter: {{chapter}}

Each question should have 4 options, and you should indicate the index of the correct answer.

Ensure that the questions are relevant to the chapter and appropriate for the grade level.

Your response should be a JSON object with a "questions" array. Each object in the array should have "question", "options" and "correctAnswerIndex" fields.
`,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizQuestionsInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
