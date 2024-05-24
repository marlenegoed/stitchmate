import Nav from '@/components/ui/navbar';

export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className='h-[calc(100%-4rem)] flex-1 flex justify-center items-center py-3 w-full bg-neutral-100 rounded-t-2xl'>
        <div className="h-full flex flex-col max-w-6xl w-full">
          {children}
        </div>
      </main>
    </>
  );
}