import Nav from '@/components/ui/navbar';

export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='h-dvh'>
        <Nav />
        <main className='h-full flex-1 flex flex-col mx-auto items-center py-3 w-full bg-neutral-100 rounded-t-2xl'>{children}</main>
      </div>
    </>
  );
}