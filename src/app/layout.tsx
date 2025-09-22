import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'વિદ્યાર્થી સહાયક',
  description: 'ધોરણ ૯-૧૨ના વિદ્યાર્થીઓ માટે શૈક્ષણિક પ્લેટફોર્મ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bgImageData = placeholderImages.placeholderImages.find(img => img.id === 'app-background');
  return (
    <html lang="gu">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="relative min-h-screen">
            {bgImageData && (
              <Image
                src={bgImageData.imageUrl}
                alt={bgImageData.description}
                fill
                className="object-cover opacity-10 dark:opacity-5"
                data-ai-hint={bgImageData.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
