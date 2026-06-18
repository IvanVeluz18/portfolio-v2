import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ivan Veluz | Software Engineer',
  description: 'Full Stack Developer · Designer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}