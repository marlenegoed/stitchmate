'use client'

export default function Spinner() {
  return (
    <div className='flex space-x-2 justify-center items-center bg-neutral-100 h-screen dark:invert'>
      <span className='sr-only'>Loading...</span>
      <div className='h-4 w-4 bg-neutral-300 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-4 w-4 bg-neutral-300 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-4 w-4 bg-neutral-300 rounded-full animate-bounce'></div>
    </div>
  )
}