import './globals.css';
import {notoSans} from '@/components/ui/fonts';
import Nav from '@/components/ui/navbar';


import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${notoSans.className} antialiased 
      flex flex-col h-lvh bg-white
      `}>
          {children}
      </body>
    </html>
    </ClerkProvider>
  );
}