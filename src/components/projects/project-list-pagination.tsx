'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import clsx from 'clsx'
import {usePathname, useSearchParams} from 'next/navigation'

export default function ProjectListPagination({pageCount}: {pageCount: number}) {

  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentPageParams = new URLSearchParams(searchParams)
  const currentPage = parseInt(currentPageParams.get('page') || '')

  const prevPageParams = new URLSearchParams(searchParams)
  if (!currentPage || currentPage < 2) {
    prevPageParams.delete('page')
  } else {
    prevPageParams.set('page', `${currentPage - 1}`)
  }

  const nextPageParams = new URLSearchParams(searchParams)
  if (currentPage) {
    nextPageParams.set('page', `${currentPage + 1}`)
  } else {
    nextPageParams.set('page', `${1}`)
  }


  return (
    <Pagination className='mb-4 mt-auto text-slate-800'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`${pathname}?${prevPageParams}`} className={clsx({'invisible': Number.isNaN(currentPage) || currentPage < 1})} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{pageCount}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`${pathname}?${nextPageParams}`} className={clsx({'invisible': pageCount === currentPage})} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}