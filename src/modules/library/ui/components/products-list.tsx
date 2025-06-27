'use client'

import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";
import { DEFAULT_LIMIT } from "@/lib/constant";
import { cn } from "@/lib/utils";
import ProductCard, { ProductCardSkeleton } from "./product-card";



const ProductList = () => {
  const trpc = useTRPC();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(trpc.library.getMany.infiniteQueryOptions({
    limit: DEFAULT_LIMIT
  }, {
    getNextPageParam: (lastPage) => lastPage.docs.length > 0 ? lastPage.nextPage : undefined

  }))

  if (data?.pages?.[0]?.docs.length == 0) {
    return (
      <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
        <InboxIcon />
        <p className="text-base font-medium ">No products found</p>
      </div>



    )
  }

  return (
    <>
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4")}>
        {
          data?.pages.flatMap((page) => page.docs).map((product) => (
            <ProductCard
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              tenantSlug={product.tenant.slug}
              tenantImageUrl={product.tenant?.image?.url}
              reviewCount={3}
              reviewRating={4}
              key={product.id} />

          ))

        }
      </div>

      <div className="flex justify-center pt-8 ">
        {
          hasNextPage && (
            <Button
              className="font-medium disabled:opacity-50 text-base bg-white "
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              variant={'elevated'}> Load more</Button>
          )
        }
      </div>


    </>
  )
}


export default ProductList;


export const ProductsListSkeleton = ({ narrowview }: { narrowview?: boolean }) => {

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4", { "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3": narrowview })}>
      {
        Array.from({ length: 5 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))
      }
    </div>
  )
}
