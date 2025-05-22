'use client'
import { Button } from "@/components/ui/button";
import { useProductFilters } from "../../hooks/use-products-filters"
import { cn } from "@/lib/utils";


export const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();


  return (
    <div
      className="flex items-center gap-2"

    >
      <Button
        size={'sm'}
        className={
          cn('rounded-full bg-white hover:bg-white', {

            "bg-transparent , border-transparent hover:border-border hover:bg-transparent": filters.sort !== "curated"
          })
        }

        variant={'secondary'}
        onClick={() => setFilters({ sort: 'curated' })}
      >
        Curated
      </Button>
      <Button
        size={'sm'}
        className={
          cn('rounded-full bg-white hover:bg-white', {

            "bg-transparent , border-transparent hover:border-border hover:bg-transparent": filters.sort !== "trending"
          })
        }

        variant={'secondary'}
        onClick={() => setFilters({ sort: 'trending' })}
      >
        Trending
      </Button>     
      <Button
        size={'sm'}
        className={
          cn('rounded-full bg-white hover:bg-white', {

            "bg-transparent , border-transparent hover:border-border hover:bg-transparent": filters.sort !== "hot_and_new"
          })
        }

        variant={'secondary'}
        onClick={() => setFilters({ sort: 'hot_and_new' })}
      >
    Hot & New
      </Button> </div>
  )
}
