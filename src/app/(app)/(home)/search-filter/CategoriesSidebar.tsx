'use client'
import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
import { CustomCategory } from '../types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Elsie_Swash_Caps } from 'next/font/google';
interface Props { 
    open : boolean , 
    onChange : (vakue  : boolean)=> void;
    data : CustomCategory[]
}
const CategoriesSidebar = ({open , onChange, data} : Props) => {
    const [parentCategories , setParentCategories]= useState<CustomCategory[] | null >(null)
    const [selectedCategory , setSelectedCategory]= useState<CustomCategory | null >(null)
    const Router = useRouter()
    // If we have parent categories show those otherwise show root categories
    const currentCatagories = parentCategories ?? data ?? [];
    const handleOpenChange = (value : boolean) => { 
        setParentCategories(null)
        setSelectedCategory(null)
        onChange(value)
    }
    const handleCategoryClick = (category : CustomCategory) =>{
        if(category.subcategories && category.subcategories.length > 0){
            setParentCategories(category.subcategories as CustomCategory[])
            setSelectedCategory(category as CustomCategory);
        }else{ 
            // this is a leaf category ( no subcategory)
            if(parentCategories && selectedCategory){
                Router.push(`/${selectedCategory.slug}/${category.slug}`)
            }else{
               if(category.slug == 'all'){
                Router.push('/')
               }else{
                Router.push(`/${category.slug}`);
               }
            }
            handleOpenChange(false)
        }
    }
    const handleBack = () => {
        if(parentCategories){
            setParentCategories(null)
            setSelectedCategory(null)
        }
       
    }
    const backgroundColor = selectedCategory?.color  ?? "white"
   return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
    <SheetContent side='left'  className=' p-0transition-none'
    style={{backgroundColor}}
    >
      <SheetHeader className='border-b  '>
        <SheetTitle className=''>
            Categories
        </SheetTitle>
      </SheetHeader>
      <ScrollArea className='flex flex-col overflow-y-auto h-full pb-2 '>
                {
                    parentCategories && (
                        <button
                        onClick={handleBack}
                        className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer'
                        >
                            <ChevronLeftIcon className='size-4 mr-2'/>
                            black
                        </button>
                    )
                }
                {
                    currentCatagories.map((cat, index)=>(
                        <button key={cat.slug}

                        onClick={()=>handleCategoryClick(cat)}
                         className='w-full text-left p-4 justify-between hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer '
                        >
                            {cat.name}
                            {
                                cat.subcategories && cat.subcategories.length > 0 &&  (
                                     <ChevronRightIcon className='size-4 ' />       
                                )
                            }
                        </button>
                    ))
                }
      </ScrollArea>
    </SheetContent>
  </Sheet>
  
  )
}

export default CategoriesSidebar