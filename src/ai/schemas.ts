import {z} from 'genkit';

export const MultipleChoiceQuestionSchema = z.object({
  question: z.string().describe('The question text.'),
  options: z.array(z.string()).min(4).max(4).describe('The multiple choice options for the question.'),
  correctAnswerIndex: z.number().int().min(0).max(3).describe('The index of the correct answer in the options array.'),
});

export const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(MultipleChoiceQuestionSchema).describe('An array of multiple-choice questions.'),
});
