import Nav from '@/components/ui/navbar';

export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='h-screen'>
        <main className='flex-1 flex flex-col mx-auto items-center w-full bg-neutral-100 rounded-t-2xl'>{children}</main>
      </div>
    </>
  );
}