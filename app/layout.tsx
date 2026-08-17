import './globals.css';

export const metadata = {
  title: 'Testimonial Grid Builder',
  description: 'Create and embed beautiful social proof grids instantly.',
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
