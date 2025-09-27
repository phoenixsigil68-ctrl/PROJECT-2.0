'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { quotes } from '@/lib/quotes';

export function QuotesSlider() {
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {quotes.map((quote, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-none">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <blockquote className="text-lg md:text-xl font-medium text-foreground/80">
                    “{quote.text}”
                  </blockquote>
                  <cite className="mt-4 text-base text-muted-foreground">- {quote.author}</cite>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
