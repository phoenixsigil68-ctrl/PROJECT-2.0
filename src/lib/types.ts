import type { GenerateQuizQuestionsOutput } from "@/ai/flows/generate-quiz-questions";

export interface Chapter {
  id: string;
  name: string;
  content: string;
  videoUrl?: string;
  imageUrl?: string;
  imageHint?: string;
  quiz: QuizQuestion[];
}

export interface Subject {
  id: string;
  name: string;
  chapters: Chapter[];
}

export interface Grade {
  id: string;
  name: string;
  subjects: Subject[];
}

export type QuizQuestion = GenerateQuizQuestionsOutput["questions"][0];
