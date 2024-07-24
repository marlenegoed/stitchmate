import Link from 'next/link';

export default function LandingPageFooter() {

  return (
    <footer className='border-t w-full py-4 h-28'>
      <Link href='/about' className='cursor-pointer text-neutral-400 p-6'>© stitchmate by Marlene Goedecke.</Link>
    </footer>
  )
}