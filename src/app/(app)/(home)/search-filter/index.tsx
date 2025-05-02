'use client'
import React from 'react'
import SeachInput from './Seach-Input'
import Categories from './Categories'
import { CustomCategory } from '../types'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'




const SearchFilter = () => {
  const trpc= useTRPC();
  const {data}= useSuspenseQuery(trpc.categories.getMany.queryOptions())
  return (
    <div className='px-4 lg:px-12 py-8 flex gap-4 flex-col border-b w-full ' style={{
      backgroundColor : "#f5f5f5"
    }}>
        <SeachInput   />
        <div className='hidden lg:block'>
        <Categories data={data} />
        </div>
    </div>
  )
}

export default SearchFilter


export const SearchFiltersSkeleton = ( ) =>  {
  return (
<div className='px-4 lg:px-12 py-8 flex gap-4 flex-col border-b w-full ' style={{
  backgroundColor : '#f5f5f5'
}}>
        <SeachInput disabled  />
        <div className='hidden lg:block'>
        <div className='h-11 '></div>
        </div>
    </div>
  )
}