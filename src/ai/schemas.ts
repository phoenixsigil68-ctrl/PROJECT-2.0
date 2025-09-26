import {z} from 'genkit';

export const MultipleChoiceQuestionSchema = z.object({
  question: z.string().describe('The question text.'),
  options: z.array(z.string()).min(4).max(4).describe('The multiple choice options for the question.'),
  correctAnswerIndex: z.number().int().min(0).max(3).describe('The index of the correct answer in the options array.'),
});

export const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(MultipleChoiceQuestionSchema).describe('An array of multiple-choice questions.'),
});

// STT Schemas
export const SpeechToTextInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "The user's speech as an audio data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export const SpeechToTextOutputSchema = z.string();


// TTS Schemas
export const TextToSpeechInputSchema = z.string();
export const TextToSpeechOutputSchema = z.object({
  audioDataUri: z.string().describe('The generated audio as a WAV data URI.'),
});
