import Nav from '@/components/ui/navbar';
import {UserSettingsStoreProvider} from '@/providers/user-settings-store-provider';

export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Nav />
        <main className='min-h-[calc(100dvh_-_4rem)] flex flex-col mx-auto items-center w-full bg-neutral-100 mt-10'>
          {children}
        </main>
    </>
  );
}