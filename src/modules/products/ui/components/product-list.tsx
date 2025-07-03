'use client'

import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useProductFilters } from "../../hooks/use-products-filters";
import ProductCard, { ProductCardSkeleton } from "./product-card";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";
import { DEFAULT_LIMIT } from "@/lib/constant";
import { cn } from "@/lib/utils";


interface Props {
  category?: string;
  tenantSlug?: string;
  narrowview?: boolean;
}

const ProductList = ({ category, tenantSlug, narrowview }: Props) => {
  const trpc = useTRPC();
  // console.log(tenantSlug)
  const [filters] = useProductFilters();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    category,
    ...filters,
    tenantSlug,
    limit: DEFAULT_LIMIT
  }, {
    getNextPageParam: (lastPage) => {

      // console.log("this is the product list ", lastPage)
      return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
    }
    }))
  if (data.pages?.[0]?.docs.length == 0) {
    return (
      <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
        <InboxIcon />
        <p className="text-base font-medium ">No products found</p>
      </div>
    )
  }
  return (
    <>
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4", { "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3": narrowview })}>
        {
          data?.pages.flatMap((page) => page.docs).map((product) => (
            <ProductCard
              id={product.id}
              name={product.name}
              imageUrl={product.image?.url}
              tenantSlug={product.tenant.slug}
              tenantImageUrl={product.tenant?.image?.url}
              reviewCount={product.reviewsCount}
              reviewRating={product.reviewsRating}
              price={parseInt(product.price)}
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
