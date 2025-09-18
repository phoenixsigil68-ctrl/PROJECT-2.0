'use server';

import { generateQuizQuestions } from '@/ai/flows/generate-quiz-questions';
import type { GenerateQuizQuestionsOutput } from '@/ai/flows/generate-quiz-questions';

export type CreateQuizState = {
  formKey: number;
  success: boolean;
  message: string;
  data: GenerateQuizQuestionsOutput | null;
};

export async function createQuizAction(
  prevState: CreateQuizState,
  formData: FormData
): Promise<CreateQuizState> {
  const grade = formData.get('gradeLevel');
  if (grade !== '9' && grade !== '10' && grade !== '11' && grade !== '12') {
    return { ...prevState, success: false, message: 'અમાન્ય ધોરણ સ્તર.' };
  }

  const subject = formData.get('subjectName') as string;
  const chapter = formData.get('chapterName') as string;

  try {
    const quizData = await generateQuizQuestions({
      gradeLevel: grade,
      subject: subject,
      chapter: chapter,
      numberOfQuestions: 10,
    });
    return { formKey: prevState.formKey + 1, success: true, message: 'ક્વિઝ સફળતાપૂર્વક બનાવવામાં આવી!', data: quizData };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'એક અજ્ઞાત ભૂલ આવી.';
    return { ...prevState, success: false, message: `ક્વિઝ બનાવવામાં નિષ્ફળ: ${message}` };
  }
}
