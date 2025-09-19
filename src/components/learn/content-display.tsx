import type { Chapter } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import placeholderImages from '@/lib/placeholder-images.json';
import { BookMarked, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export function ContentDisplay({ chapter }: { chapter: Chapter }) {
  const chapterImage = placeholderImages.placeholderImages.find(img => img.id === chapter.imageUrl);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6 text-lg text-foreground/90 leading-relaxed">
          <p>{chapter.content}</p>

          {chapter.textbookUrl && (
            <div className="my-8 rounded-lg border bg-secondary/30 p-6 shadow-sm">
              <h3 className="text-2xl font-bold font-headline mb-4 text-primary flex items-center">
                <BookMarked className="mr-3 h-6 w-6" />
                પાઠ્યપુસ્તક
              </h3>
              <p className="mb-4 text-muted-foreground">
                સંપૂર્ણ પ્રકરણ વાંચવા અને અભ્યાસ કરવા માટે સત્તાવાર પાઠ્યપુસ્તક ખોલો.
              </p>
              <Button asChild>
                <Link href={chapter.textbookUrl} target="_blank" rel="noopener noreferrer">
                  પાઠ્યપુસ્તક ખોલો
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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
