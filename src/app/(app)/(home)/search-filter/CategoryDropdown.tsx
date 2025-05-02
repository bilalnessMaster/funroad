'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React, { useRef, useState } from 'react'
import { useDropdownPosition } from './use-hook-dropdown'
import { SubCategoryMenu } from './subcategoryMenu'
import Link from 'next/link'
import { CategoriesGetManyOutput } from '@/modules/categories/types'
interface Props {
  category: CategoriesGetManyOutput[1],
  isActive: boolean,
  isNavigationHovered: boolean
}
const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { getDropdownPosition } = useDropdownPosition(dropdownRef)
  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true)
    }
  }
  const onMouseLeave = () => {
    setIsOpen(false)
  }
  const toggelDropdown = () =>{
    if (category.subcategories) {
      setIsOpen(!isOpen)
    }
  }
  const dropdownPosition = getDropdownPosition();
  return (
    <div className='relative w-fit'
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      

    >
      <div className='relative w-fit'>
        <Button onClick={toggelDropdown}  variant={'elevated'} className={cn('h-11 px-4 bg-none border-transparent rounded-full hover:bg-white hover:border-primary text-black', { 'bg-none hover:border-primary': !isActive && !isNavigationHovered , 'bg-white border-primary  shadow-[4px_4px_0px_0px_rgba(0,0,0,,1)] -translate-x-[4px] -translate-y-[4px]' : isOpen})} >
          <Link href={`/${category.slug === 'all' ? "" : category.slug}`}>
          {category.name}
          
          </Link>
        </Button>

        {
          category.subcategories && (category.subcategories as []).length > 0 && (
            <div className={cn('opacity-0 absolute  -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-l-transparent border-r-transparent border-b-black  left-1/2 -translate-x-1/2 border-t-0 border-b-[10px] ', { 'opacity-100': isOpen })} />

          )
        }
      </div>
      <SubCategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />

    </div>
  )
}

export default CategoryDropdown








