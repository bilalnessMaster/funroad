
import { DEFAULT_LIMIT } from "@/lib/constant";
import { loadProductFitlers } from "@/modules/products/hooks/use-products-filters";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";




export const dynamic =  "force-dynamic"

interface Props {
  searchParams: Promise<SearchParams>
}


const Page = async (props: Props) => {
  const filters = await loadProductFitlers(props.searchParams)
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filters,
    limit: DEFAULT_LIMIT,
  }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary >)

}


export default Page;
