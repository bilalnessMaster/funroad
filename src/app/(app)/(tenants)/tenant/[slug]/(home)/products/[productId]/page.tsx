import ProductView, { ProductViewSkeleton } from "@/modules/products/ui/views/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";


export const dynamic =  "force-dynamic"

interface Props {
  params: Promise<{ productId: string, slug: string }>

}


const Page = async ({ params }: Props) => {
  const { productId, slug } = await params
  //  const filters = await loadProductFitlers(searchParams)
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getOne.queryOptions({
    id: productId,
  }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={ <ProductViewSkeleton /> } >
        <ProductView productId={productId} tenantSlug={slug} />
      </Suspense>
    </HydrationBoundary >)

}


export default Page;
