'use client'

import {HiMiniMagnifyingGlass, HiOutlineMagnifyingGlass} from "react-icons/hi2";
import {Input} from '../ui/input';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {DebouncedState, useDebouncedCallback} from 'use-debounce'
import {cn} from '@/lib/utils';
import {IconBaseProps} from 'react-icons';
import {forwardRef} from 'react';



export default function ProjectListSearch({className}: {className?: string}) {
  const [title, handleSearch] = useTitleSearch()

  return (
    <label className={cn('sm:ml-12', className)}>
      <ProjectSearchIcon variant='mini' className="absolute mt-3 ml-4  cursor-pointer" />
      <ProjectSearchInput defaultValue={title || ''} onChange={(e) => handleSearch(e.target.value)} />
    </label>
  )
}

const ProjectSearchInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return <Input
    ref={ref}
    placeholder='Search by title'
    name="project-title"
    id="project-title"
    variant='inline'
    className={cn('placeholder:text-slate-800 pl-10 text-base rounded-full bg-neutral-100 sm:bg-neutral-200 h-10', props.className)}
    {...props} />
})

export interface ProjectSearchIconProps extends IconBaseProps {
  className?: string,
  variant: "mini" | "outline"
}

export function ProjectSearchIcon({variant, className, ...props}: ProjectSearchIconProps) {
  const classes = cn("text-slate-800", className)
  if (variant === "mini") {
    return <HiMiniMagnifyingGlass className={classes} {...props} />
  }
  return <HiOutlineMagnifyingGlass className={classes} {...props} />
}

export function useTitleSearch(): [string | null, DebouncedState<(title: any) => void>] {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = useDebouncedCallback((title) => {
    const params = new URLSearchParams(searchParams)
    if (title) {
      params.set("title", title)
    } else {
      params.delete("title")
    }
    params.delete("page")
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  return [searchParams.get("title"), handleSearch]
}

export {ProjectSearchInput}