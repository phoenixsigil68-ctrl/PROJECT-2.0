'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-quiz-questions.ts';
import '@/ai/flows/chat-flow.ts';
import '@/ai/flows/ask-doubt-flow.ts';
import '@/ai/flows/generate-flashcards-flow.ts';
