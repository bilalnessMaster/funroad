'use client'

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";


interface Props { 
 category : string;

}

const ProductList = ({category}  : Props) => {
  const trpc = useTRPC();

  const {data : products} = useSuspenseQuery(trpc.products.getMany.queryOptions({
    category
  }))
  return (
    <div className="whitespace-break-spaces">
      products  : {JSON.stringify(products)}
    </div>

  )
}


export default ProductList;


export const ProductsListSkeleton = () => {

  return (
    <div>
      loading ...
    </div>
  )
}
