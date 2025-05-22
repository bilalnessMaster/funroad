


interface Props {
  params: Promise<{
    subcategory: string;
    category: string;

  }> ;
  searchParams: Promise<SearchParams>
}



import { loadProductFitlers } from "@/modules/products/hooks/use-products-filters";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";




const Page = async (props: Props) => {
  const params = await props.params;
  const filters = await loadProductFitlers(props.searchParams)
  const category = params.subcategory;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
    category,
    ...filters
  }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={category} />
    </HydrationBoundary >)

}


export default Page;
