


interface Props { 
params : Promise<{
  subcategory : string; 
  category : string;

}>
}



import ProductList, { ProductsListSkeleton } from "@/modules/products/ui/components/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";




const Page = async (props: Props) => {
  const {subcategory:category}  = await props.params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
    category ,
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<ProductsListSkeleton/>}>

    <ProductList category={category} /> 
    
    </Suspense>
    </HydrationBoundary >)

}


export default Page;

