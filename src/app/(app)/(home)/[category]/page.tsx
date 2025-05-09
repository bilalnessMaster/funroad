import ProductList, { ProductsListSkeleton } from "@/modules/products/ui/components/product-list";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";


interface Props {
  params: Promise<{ category: string }>
}


const Page = async (props: Props) => {
  const params = await props.params;
  const category = params.category;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
    category,
  }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<ProductsListSkeleton/>}>

    <ProductList category={category} /> 
    
    </Suspense>
    </HydrationBoundary >)

}


export default Page;
