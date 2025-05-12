'use client'

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";


interface Props {
  category: string;

}

const ProductList = ({ category }: Props) => {
  const trpc = useTRPC();

  const { data: products } = useSuspenseQuery(trpc.products.getMany.queryOptions({
    category
  }))
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {
        products?.docs.map((product)=>(
          <div key={product.id} className="border rounded-md bg-white p-4">
          <h1 className="text-xl font-medium">{product.name}</h1>
          <h2>${product.price}</h2>

          </div>
        ))
      }
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
