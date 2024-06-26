import Nav from '@/components/ui/navbar';

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