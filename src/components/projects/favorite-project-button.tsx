'use client'

import {HiMiniHeart} from "react-icons/hi2";
import {HiOutlineHeart} from "react-icons/hi2";
import {Button} from '../ui/button';
import {toggleFavorite} from '@/database/queries/queries';

interface FavoriteProjectProps {
  userId: string,
  projectId: number,
  isFavorite: boolean,
}

export default function FavoriteProject({userId, projectId, isFavorite}: FavoriteProjectProps) {
  const heart = isFavorite ? <HiMiniHeart size={20} className='fill-slate-800' /> : <HiOutlineHeart className='text-slate-800' size={20} />

  async function handleClick() {
    await toggleFavorite(userId, projectId)
  }

  return (
    <Button onClick={handleClick} variant='ghost' size='icon'>{heart}</Button>
  )
}