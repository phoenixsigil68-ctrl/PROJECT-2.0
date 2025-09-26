'use client';

import type { Chapter, Grade, Subject } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import placeholderImages from '@/lib/placeholder-images.json';
import { BookMarked, ExternalLink, Youtube } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { AskDoubt } from './ask-doubt';
import { Separator } from '../ui/separator';
import { ContentSummarizer } from './content-summarizer';

export function ContentDisplay({ chapter, grade, subject }: { chapter: Chapter, grade: Grade, subject: Subject }) {
  const chapterImage = placeholderImages.placeholderImages.find(img => img.id === chapter.imageUrl);
  const youtubeSearchQuery = encodeURIComponent(`${grade.name} ${subject.name} ${chapter.name}`);
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${youtubeSearchQuery}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
        <Card>
            <CardContent className="p-6">
                <ContentSummarizer chapter={chapter} />
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-6">
                <AskDoubt chapter={chapter} />
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-6 space-y-6">
                <div>
                    <h3 className="text-xl font-bold font-headline mb-3 text-primary flex items-center">
                        <BookMarked className="mr-3 h-6 w-6" />
                        પાઠ્યપુસ્તક
                    </h3>
                    <p className="mb-4 text-muted-foreground text-sm">
                        સંપૂર્ણ પ્રકરણ વાંચવા માટે સત્તાવાર પાઠ્યપુસ્તક ખોલો.
                    </p>
                    <Button asChild className="w-full">
                        <Link href={chapter.textbookUrl || 'https://www.selfstudys.com/'} target="_blank" rel="noopener noreferrer">
                        પાઠ્યપુસ્તક ખોલો
                        <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                
                <Separator />

                <div>
                    <h3 className="text-xl font-bold font-headline mb-3 text-primary flex items-center">
                        <Youtube className="mr-3 h-6 w-6" />
                        વિડિઓ લેક્ચર
                    </h3>
                    <p className="mb-4 text-muted-foreground text-sm">
                        આ પ્રકરણને લગતા વિડિઓ લેક્ચર્સ શોધવા માટે YouTube પર જાઓ.
                    </p>
                    <Button asChild variant="secondary" className="w-full">
                        <Link href={youtubeSearchUrl} target="_blank" rel="noopener noreferrer">
                        YouTube પર શોધો
                        <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
         {chapterImage && (
          <Card className="overflow-hidden aspect-video">
              <Image
                src={chapterImage.imageUrl}
                alt={chapterImage.description}
                fill
                className="object-cover"
                data-ai-hint={chapterImage.imageHint}
              />
          </Card>
        )}

        {chapter.videoUrl && (
            <Card className="md:col-span-2">
                <CardContent className="p-6">
                    <h3 className="text-2xl font-bold font-headline mb-4 text-primary">વિડિઓ લેક્ચર</h3>
                    <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                        className="w-full h-full border-0"
                        src={chapter.videoUrl}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        ></iframe>
                    </div>
                </CardContent>
            </Card>
        )}
      </div>
  );
}
