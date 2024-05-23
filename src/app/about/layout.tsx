
export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className='h-full flex-1 flex flex-col mx-auto items-center justify-between w-full py-4 bg-goldenrod-100 rounded-t-2xl'>{children}</main>
    </>
  );
}