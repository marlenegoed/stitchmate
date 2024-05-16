import shortenText from '@/lib/shorten-text';

export default function ReminderTag ({title}:{title:string}) {

  return (
    <div className='bg-viridian-800 rounded-full h-fit w-fit py-px px-4'>
      <p className='text-neutral-100 font-semibold text-sm leading-loose'>{shortenText(title, 30)}</p>
    </div>
  );
}