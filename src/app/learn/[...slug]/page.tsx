import { AppData } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentDisplay } from '@/components/learn/content-display';
import { QuizView } from '@/components/learn/quiz-view';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FlashcardView } from '@/components/learn/flashcard-view';
import { LearningTracker } from '@/hooks/use-learning-tracker';

export default function LearnPage({ params }: { params: { slug: string[] } }) {
  const [gradeId, subjectId, chapterId] = params.slug;

  const grade = AppData.find(g => g.id === gradeId);
  const subject = grade?.subjects.find(s => s.id === subjectId);
  const chapter = subject?.chapters.find(c => c.id === chapterId);

  if (!chapter || !grade || !subject) {
    notFound();
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
       <LearningTracker />
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline text-primary">{chapter.name}</h1>
          <p className="text-muted-foreground">
            {grade.name} - {subject.name}
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            મુખ્ય પૃષ્ઠ
          </Link>
        </Button>
      </header>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[600px]">
          <TabsTrigger value="content">અભ્યાસક્રમ</TabsTrigger>
          <TabsTrigger value="flashcards">ફ્લેશકાર્ડ્સ</TabsTrigger>
          <TabsTrigger value="quiz">ક્વિઝ</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="mt-4">
          <ContentDisplay chapter={chapter} grade={grade} subject={subject} />
        </TabsContent>
        <TabsContent value="flashcards" className="mt-4">
          <FlashcardView chapter={chapter} />
        </TabsContent>
        <TabsContent value="quiz" className="mt-4">
          <QuizView chapter={chapter} grade={grade} subject={subject} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
