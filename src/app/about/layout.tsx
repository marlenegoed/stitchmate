
export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className='min-h-dvh flex-1 flex flex-col mx-auto items-center justify-between w-full py-4 bg-goldenrod-200'>{children}</main>
    </>
  );
}