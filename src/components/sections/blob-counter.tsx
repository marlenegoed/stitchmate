import BackgroundBlob from '../ui/background-blobs';

interface BlobCounterProps {
  count: number,
  color: string,
  blobIndex: number,
  onClick?: () => void
}

export function BlobCounter({color, count, blobIndex, onClick}: BlobCounterProps) {
  return (
    <div className='relative flex items-center justify-center' onClick={onClick}>
      <button className='text-8xl text-center z-10 relative text-zinc-800 p-16'>
        <span>{count}</span>
      </button>
      <BackgroundBlob className={`fill-${color} absolute top-0 left-0`} stroke={true} blobIndex={blobIndex} />
    </div>
  )
}