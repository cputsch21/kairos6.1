import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kairos - Daily Thought Assistant',
  description: 'Kairos helps Type A people stress less, get more done, and feel more alive.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
