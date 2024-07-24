import './globals.css';
import {openSans} from '@/components/ui/fonts';
import {Toaster} from '@/components/ui/toaster';
import {UserSettingsStoreProvider} from '@/providers/user-settings-store-provider';
import {ClerkProvider} from '@clerk/nextjs'

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <UserSettingsStoreProvider>
        <html lang="en">
          <body className={`${openSans.className} antialiased h-full min-h-dvh bg-neutral-100`}>
            {children}
            <Toaster />
          </body>
        </html>
      </UserSettingsStoreProvider>
    </ClerkProvider>
  );
}