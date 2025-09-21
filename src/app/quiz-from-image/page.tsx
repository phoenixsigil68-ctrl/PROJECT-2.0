import { ImageQuizGenerator } from '@/components/quiz-from-image/image-quiz-generator';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function QuizFromImagePage() {
  return (
    <div className="min-h-screen bg-secondary/40">
      <div className="container mx-auto p-4 md:p-8">
        <header className="flex items-center justify-between mb-6 bg-card p-4 rounded-xl shadow-sm border">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-headline text-primary">
              છબીમાંથી ક્વિઝ બનાવો
            </h1>
            <p className="text-muted-foreground">
              તમારા પાઠ્યપુસ્તકના પૃષ્ઠની છબી અપલોડ કરો અને AI ને તમારા માટે ક્વિઝ બનાવવા દો.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              મુખ્ય પૃષ્ઠ
            </Link>
          </Button>
        </header>
        <main>
          <ImageQuizGenerator />
        </main>
      </div>
    </div>
  );
}
