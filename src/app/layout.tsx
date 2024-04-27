import './globals.css';
import {lato} from '@/components/ui/fonts';
import Nav from '@/components/ui/navbar';
import { ReactElement, FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const RootLayout: FC<Props> = ({children}) : ReactElement => {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased 
      flex flex-col h-lvh bg-stone-50
      `}>
        <Nav />
        <main className='flex-1 max-w-screen-sm flex flex-col mx-auto items-center px-4 py-3 w-full'>{children}</main>
      </body>
    </html>
  );
}
 
export default RootLayout;
