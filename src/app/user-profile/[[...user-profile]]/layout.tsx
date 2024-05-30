import Nav from '@/components/ui/navbar';

export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <main className='flex items-center justify-center min-h-dvh w-full bg-sienna-100/30 rounded-t-2xl'>{children}</main>
    </>
  );
}