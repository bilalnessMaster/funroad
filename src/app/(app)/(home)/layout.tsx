import React, { Suspense } from 'react'
import Navbar from '@/modules/home/ui/components/navbar'
import Footer from '@/modules/home/ui/components/Footer'

import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import SearchFilter, { SearchFiltersSkeleton } from '@/modules/home/ui/components/search-filter'
interface Props {
  children: React.ReactNode
}
const layout = async ({ children }: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions()
  );


  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>

          <SearchFilter />
        </Suspense>
      </HydrationBoundary>
      <div className='flex-grow bg-[#f4f4f0]'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default layout