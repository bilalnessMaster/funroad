'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Category } from '@/payload-types'
import React, { useRef, useState } from 'react'
import { useDropdownPosition } from './use-hook-dropdown'
import { SubCategoryMenu } from './subcategoryMenu'

interface Props {
  category: Category,
  isActive: boolean,
  isNavigationHovered: boolean
}
const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered
}: Props) => {
  const [isOpen, setIsOpen] = useState(true);
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
  const dropdownPosition = getDropdownPosition();
  return (
    <div className='relative w-fit'
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}

    >
      <div className='relative w-fit'>
        <Button variant={'elevated'} className={cn('h-11 px-4 bg-transparent rounded-full hover:bg-white hover:border-primary text-black', { 'bg-white border-primary': isActive && !isNavigationHovered })} >
          {category.name}
        </Button>
      
        {
          category.subcategories && (category.subcategories as []).length > 0 && (
            <div className={cn('opacity-0 absolute  -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-l-transparent border-r-transparent border-b-black  left-1/2 -translate-x-1/2 border-t-0 border-b-[10px] ', { 'opacity-100': isOpen })} />

          )
        }
      </div>
      <SubCategoryMenu
        category ={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />

    </div>
  )
}

export default CategoryDropdown