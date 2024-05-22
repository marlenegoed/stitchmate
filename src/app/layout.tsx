import './globals.css';
import {notoSans} from '@/components/ui/fonts';
import {Toaster} from '@/components/ui/toaster';
import {ClerkProvider} from '@clerk/nextjs'


export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${notoSans.className} antialiased flex flex-col h-lvh bg-white`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}