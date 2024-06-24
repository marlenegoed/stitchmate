import Nav from '@/components/ui/navbar';

export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className='h-[calc(100%-4rem)] min-h-dvh flex-1 flex justify-center w-full bg-neutral-100 rounded-t-2xl px-6'>
        <div className="h-full flex flex-col w-full">
          {children}
        </div>
      </main>
    </>
  );
}