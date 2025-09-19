import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ChatWidget } from '@/components/chatbot/chat-widget';

export const metadata: Metadata = {
  title: 'વિદ્યાર્થી સહાયક',
  description: 'ધોરણ ૯-૧૨ના વિદ્યાર્થીઓ માટે શૈક્ષણિક પ્લેટફોર્મ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {children}
        <ChatWidget />
        <Toaster />
      </body>
    </html>
  );
}
