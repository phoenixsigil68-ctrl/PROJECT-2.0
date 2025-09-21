
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectionForm } from '@/components/home/selection-form';
import placeholderImages from '@/lib/placeholder-images.json';
import { QuotesSlider } from '@/components/home/quotes-slider';
import { DailyProgress } from '@/components/home/daily-progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileImage } from 'lucide-react';

export default function Home() {
  const heroImageData = placeholderImages.placeholderImages.find(img => img.id === 'hero-image');

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {heroImageData && (
          <Image
            src={heroImageData.imageUrl}
            alt={heroImageData.description}
            fill
            className="object-cover opacity-10"
            data-ai-hint={heroImageData.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/90 to-background" />
      </div>

      <div className="z-10 text-center px-4 mb-8 mt-20 md:mt-16">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-4 animate-fade-in-down">
          વિદ્યાર્થી સહાયક
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
          ધોરણ ૯-૧૨ના વિદ્યાર્થીઓ માટે એક સંપૂર્ણ શૈક્ષણિક પ્લેટફોર્મ.
        </p>
      </div>
      
      <div className="w-full max-w-md z-10 mb-8">
        <DailyProgress />
      </div>

      <Card className="w-full max-w-md z-10 shadow-xl backdrop-blur-md bg-card/80 border">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-headline">તમારો પાઠ પસંદ કરો</CardTitle>
        </CardHeader>
        <CardContent>
          <SelectionForm />
        </CardContent>
      </Card>
      
       <div className="z-10 mt-8">
          <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-primary/20 hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1">
            <Link href="/quiz-from-image">
              <FileImage className="mr-2 text-primary" />
              Create Quiz with Image
            </Link>
          </Button>
        </div>

      <div className="w-full max-w-4xl z-10 mt-12 mb-8">
         <QuotesSlider />
      </div>

      <footer className="z-10 text-center text-muted-foreground text-sm py-4">
        <p>ગુજરાતના વિદ્યાર્થીઓ માટે પ્રેમથી બનાવેલ.</p>
      </footer>
    </main>
  );
}
