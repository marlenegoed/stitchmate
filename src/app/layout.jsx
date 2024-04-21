import './globals.css';
import {lato} from '@/components/ui/fonts';
import Logo from '@/components/ui/logo';
import CounterSettings from '@/components/counter/counter-settings';
import ReminderList from '@/components/reminder/reminder-list';
import CounterProgress from '@/components/counter/counter-progress';
import Menu from '@/components/ui/menu';
// import CounterMenu from '@/components/ui/counter-menu';

export default function RootLayout ({children}) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased 
      flex flex-col bg-neutral-50 h-lvh 
      `}>
        <nav className='flex justify-between p-4'>
          {/* <CounterMenu /> */}
          <Menu />
          <Logo />
          <CounterSettings />
        </nav>
        <CounterProgress />
        <main className='flex-1 max-w-screen-sm flex flex-col mx-auto px-4 py-3 w-full'>{children}</main>
      </body>
    </html>
  );
}