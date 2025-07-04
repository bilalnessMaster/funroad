import { loadProductFitlers } from "@/modules/products/hooks/use-products-filters";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";

export const dynamic =  "force-dynamic"

interface Props {
  params: Promise<{ category: string }>
  searchParams: Promise<SearchParams>
}


const Page = async (props: Props) => {
  const params = await props.params;
  const filters = await loadProductFitlers(props.searchParams)
  const category = params.category;
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    category,
    ...filters,
    limit : 10
  }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <ProductListView category={category} />
  </HydrationBoundary >)

}


export default Page;
