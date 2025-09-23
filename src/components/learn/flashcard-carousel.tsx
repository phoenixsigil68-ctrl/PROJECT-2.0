'use client';

import * as React from 'react';
import { useState } from 'react';
import type { GenerateFlashcardsOutput } from '@/ai/flows/generate-flashcards-flow';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export function FlashcardCarousel({ flashcards }: { flashcards: GenerateFlashcardsOutput['flashcards'] }) {
  const [flipped, setFlipped] = useState<boolean[]>(Array(flashcards.length).fill(false));

  const handleFlip = (index: number) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <Carousel
      className="w-full max-w-lg mx-auto"
      opts={{
        align: 'start',
      }}
    >
      <CarouselContent>
        {flashcards.map((flashcard, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 h-full" style={{ perspective: '1000px' }}>
              <div
                className="relative w-full h-64 cursor-pointer transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped[index] ? 'rotateY(180deg)' : 'none',
                }}
                onClick={() => handleFlip(index)}
              >
                {/* Front of the card (Term) */}
                <Card
                  className="absolute w-full h-full flex items-center justify-center p-6 text-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <p className="text-xl font-semibold text-primary">{flashcard.term}</p>
                </Card>
                {/* Back of the card (Definition) */}
                <Card
                  className="absolute w-full h-full flex items-center justify-center p-6 text-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <p className="text-sm text-foreground">{flashcard.definition}</p>
                </Card>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
