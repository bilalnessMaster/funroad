'use client'
import { Category } from '@/payload-types'
import React, { useRef, useState, useEffect } from 'react'
import CategoryDropdown from './CategoryDropdown'
import { CustomCategory } from '../types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ListFilterIcon } from 'lucide-react'
import CategoriesSidebar from './CategoriesSidebar'
import { useParams } from 'next/navigation'
import { CategoriesGetManyOutput } from '@/modules/categories/types'
interface Props {
  data: CustomCategory[]
}
const Categories = ({ data }: Props) => {
  const params = useParams()

  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const categoryParams = params.category as string | undefined;

  const activeCategory = categoryParams || 'all';
  const activeCategoryIndex = data.findIndex((cat) => cat.slug === activeCategory)
  const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1

  useEffect(() => {
    const calculateVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewRef.current) return;
      const containerWith = containerRef.current.offsetWidth;
      const viewAllWidth = viewRef.current.offsetWidth;
      const availableWidth = containerWith - viewAllWidth;
      const items = Array.from(measureRef.current.children)
      let totalWidth = 0;
      let visible = 0;
      for (const item of items) {
        const width = item.getBoundingClientRect().width;
        if (totalWidth + width >= availableWidth) break;
        totalWidth += width;
        visible++;

      }
      setVisibleCount(visible)
    }
    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(containerRef.current!);
    return () => resizeObserver.disconnect();
  }, [data.length])


  return (
    <div className='RELATIVE w-full'>
      {/* the other categories  */}
      <CategoriesSidebar open={isSidebarOpen} onChange={setIsSidebarOpen} />
      {/* hidden div to measure all items */}
      <div
        ref={measureRef}
        className=' abosolute opacity-0 pointer-events-none flex'
        style={{ position: "fixed", top: -9999, left: -9999 }}
      >
        {
          data.map((category: CategoriesGetManyOutput[1] ) => (
            <div key={category.id}>
              <CategoryDropdown
                category={category}
                isActive={activeCategory === category.name}
                isNavigationHovered={false}
              />
            </div>
          ))
        }
      </div>
      {/* visible items  */}
      <div className='flex flex-nowrap items-center gap-2'
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        {
          data.slice(0, visibleCount).map((category: CategoriesGetManyOutput[1] ) => (
            <div key={category.id}>
              <CategoryDropdown
                category={category}
                isActive={activeCategory === category.slug}
                isNavigationHovered={false}
              />
            </div>
          ))
        }
        <div ref={viewRef}>
          <Button variant={'elevated'} className={cn('h-11 px-4 border-transparent rounded-full bg-transparent hover:bg-white hover:border-primary text-black', { 'bg-white hover:border-primary': !isActiveCategoryHidden && !isAnyHovered, })}
            onClick={() => setIsSidebarOpen(true)}
          >
            View All
            <ListFilterIcon className='ml-2' />
          </Button>
        </div>
      </div>

    </div>
  )
}

export default Categories
