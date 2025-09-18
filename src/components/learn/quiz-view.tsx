import type { Chapter, Grade, Subject } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizTaker } from './quiz-taker';
import { QuizGenerator } from './quiz-generator';

export function QuizView({ chapter, grade, subject }: { chapter: Chapter; grade: Grade; subject: Subject }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>સ્વ-મૂલ્યાંકન ક્વિઝ</CardTitle>
          <CardDescription>તમારી સમજ ચકાસવા માટે આ ક્વિઝ આપો.</CardDescription>
        </CardHeader>
        <CardContent>
          {chapter.quiz && chapter.quiz.length > 0 ? (
            <QuizTaker initialQuestions={chapter.quiz} chapterId={`${grade.id}-${subject.id}-${chapter.id}`} />
          ) : (
            <div className="flex items-center justify-center h-40 text-muted-foreground text-center p-4 border-2 border-dashed rounded-lg">
              <p>આ પ્રકરણ માટે હજી સુધી કોઈ ક્વિઝ ઉપલબ્ધ નથી. કૃપા કરીને એક નવી બનાવો.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="bg-secondary/50">
        <CardHeader>
          <CardTitle>AI ક્વિઝ જનરેટર</CardTitle>
          <CardDescription>શિક્ષકો માટે: આ પ્રકરણ માટે નવા પ્રશ્નો બનાવવા માટે AI નો ઉપયોગ કરો.</CardDescription>
        </CardHeader>
        <CardContent>
          <QuizGenerator chapter={chapter} grade={grade} subject={subject} />
        </CardContent>
      </Card>
    </div>
  );
}
