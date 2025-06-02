
import { loadProductFitlers } from "@/modules/products/hooks/use-products-filters";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";


interface Props {
  searchParams: Promise<SearchParams>
}


const Page = async (props: Props) => {
  const filters = await loadProductFitlers(props.searchParams)
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filters,
    limit : 10
  }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <ProductListView />
  </HydrationBoundary >)

}


export default Page;
