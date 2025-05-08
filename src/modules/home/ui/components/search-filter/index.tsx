'use client'
import React from 'react'
import SeachInput from './Seach-Input'
import Categories from './Categories'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { CategoriesGetManyOutput } from '@/modules/categories/types'
import { DEFAULT_BG_COLOR } from '@/modules/home/constants'
import BreadcrumbNavigation from './BreadcrumbNavigation'




const SearchFilter = () => {
  const params = useParams()
  const categoryParam  = params.category as string | undefined; 
  const activeCategory  = categoryParam  || 'all';

  const trpc= useTRPC();

  const {data}= useSuspenseQuery(trpc.categories.getMany.queryOptions())
  const activeCategoryData= data.find((category : CategoriesGetManyOutput[1])=> category.slug === activeCategory);
  const activeCategoryName = activeCategoryData?.name || undefined;
 
  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeSubcategory  = params.subcategory as string | undefined;
  const activeSubcategoryName = activeCategoryData?.subcategories?.find((subcategory) => subcategory?.slug === activeSubcategory )?.name
  return (
    <div className='px-4 lg:px-12 py-8 flex gap-4 flex-col border-b w-full ' style={{
      backgroundColor : activeCategoryColor 
    }}>
        <SeachInput   />
        <div className='hidden lg:block'>
        <Categories data={data} />
        </div>
        <BreadcrumbNavigation
        activeCategoryName={activeCategoryName}
        activeCategory={activeCategory}
        activeSubcategoryName={activeSubcategoryName}

        />
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
