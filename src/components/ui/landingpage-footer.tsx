import Link from 'next/link';

export default function LandingPageFooter() {

  return (
    <footer className='w-full py-6 flex justify-center'>
      <Link href='/about' className='cursor-pointer text-neutral-400 text-sm'>© stitchmate by Marlene Goedecke.</Link>
    </footer>
  )
}