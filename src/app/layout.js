import './globals.css'

export const metadata = {
  title: 'Get Well Soon',
  description: 'Support message',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
