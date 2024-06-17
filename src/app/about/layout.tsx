
export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className='min-h-dvh w-full p-2 sm:p-8 bg-neutral-50'>{children}</main>
    </>
  );
}