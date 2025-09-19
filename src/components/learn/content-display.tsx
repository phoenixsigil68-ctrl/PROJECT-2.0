import type { Chapter } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import placeholderImages from '@/lib/placeholder-images.json';
import { BookMarked } from 'lucide-react';

export function ContentDisplay({ chapter }: { chapter: Chapter }) {
  const chapterImage = placeholderImages.placeholderImages.find(img => img.id === chapter.imageUrl);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6 text-lg text-foreground/90 leading-relaxed">
          <p>{chapter.content}</p>

          {chapter.textbookUrl && (
            <div className="my-8">
              <h3 className="text-2xl font-bold font-headline mb-4 text-primary flex items-center">
                <BookMarked className="mr-3 h-6 w-6" />
                પાઠ્યપુસ્તક
              </h3>
              <div className="aspect-[4/5] w-full">
                <iframe
                  src={`https://docs.google.com/gview?url=${chapter.textbookUrl}&embedded=true`}
                  className="w-full h-full rounded-lg shadow-lg border"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          )}

          {chapterImage && (
            <div className="my-8 rounded-lg overflow-hidden shadow-lg border">
              <Image
                src={chapterImage.imageUrl}
                alt={chapterImage.description}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                data-ai-hint={chapterImage.imageHint}
              />
            </div>
          )}

          {chapter.videoUrl && (
            <div className="my-8">
              <h3 className="text-2xl font-bold font-headline mb-4 text-primary">વિડિઓ લેક્ચર</h3>
              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded-lg shadow-lg border"
                  src={chapter.videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
