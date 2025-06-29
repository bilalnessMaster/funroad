'use client'
import { Input } from '@/components/ui/input'
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from 'lucide-react'
import React, { useState } from 'react'

import CategoriesSidebar from './CategoriesSidebar';
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
interface Props {
  disabled?: boolean;
}
const SeachInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const trpc = useTRPC()
  const session = useQuery(trpc.auth.session.queryOptions())
  return (
    <div className='flex items-center gap-2 w-full'>
      <CategoriesSidebar open={isSidebarOpen} onChange={setIsSidebarOpen} />
      <div className='relative w-full '>
        <SearchIcon className=' absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500' />
        <Input className='pl-8 ' placeholder='Seach products' disabled={disabled} />
      </div>
      {/* to do categories view all */}
      <Button
        onClick={() => setIsSidebarOpen(true)}
        variant={'elevated'}
        className='size-12  shrink-0 flex lg:hidden'
      >
        <ListFilterIcon className='text-black' color='black' />
      </Button>
      {/* add library */}
      {
        session?.data?.user && (
          <Button
            asChild
            variant={'elevated'}

          >
            <Link prefetch href='/library'>
              <BookmarkCheckIcon className='mr-2' />
              library
            </Link>
          </Button>
        )
      }
    </div>
  )
}

export default SeachInput
