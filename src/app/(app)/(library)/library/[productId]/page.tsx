
import { ProductView } from "@/modules/library/ui/view/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  params: Promise<{ productId: string }>;
}

const Page = async ({ params }: Props) => {
  const { productId } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.library.getOne.queryOptions({
    productId
  }))
  void queryClient.prefetchQuery(trpc.reviews.getOne.queryOptions({
    productId
  }))


  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<div className="flex items-center justify-center">wait ...</div>}>
        <ProductView productId={productId} />
      </Suspense>
    </HydrationBoundary>
  )
}


export default Page;
