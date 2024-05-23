'use client'

import {HiMiniHeart} from "react-icons/hi2";
import {HiOutlineHeart} from "react-icons/hi2";
import {Button} from '../ui/button';
import {toggleFavorite} from '@/database/queries/projects';
import {useState} from 'react';
import {Tooltip} from '../ui/tooltip';

interface FavoriteProjectProps {
  projectId: number,
  isFavorite: boolean,
}

export default function FavoriteProject({projectId, isFavorite}: FavoriteProjectProps) {

  const [favorite, setFavorite] = useState(isFavorite)

  const heart = favorite ? <HiMiniHeart size={20} className='fill-slate-800' /> : <HiOutlineHeart className='text-slate-800' size={20} />

  async function handleClick() {
    await toggleFavorite(projectId)
    setFavorite(!favorite)
  }

  return (
    <Tooltip title="Favorite project">
      <Button onClick={handleClick} variant='ghost' size='icon'>{heart}</Button>
    </Tooltip>
  )
}