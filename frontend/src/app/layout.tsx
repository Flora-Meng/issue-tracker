import '../styles/globals.css';

export const metadata = {
  title: 'Todo Tracker',
  description: 'A simple todo tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="__next">{children}</div>
      </body>
    </html>
  );
}
