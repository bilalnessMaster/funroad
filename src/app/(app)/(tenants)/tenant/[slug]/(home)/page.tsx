
import { DEFAULT_LIMIT } from "@/lib/constant";
import { loadProductFitlers } from "@/modules/products/hooks/use-products-filters";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";


interface Props {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
}


const Page = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const filters = await loadProductFitlers(searchParams)
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filters,
    tenantSlug: slug,
    limit: DEFAULT_LIMIT,
  }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} narrowview={true} />
    </HydrationBoundary >)

}


export default Page;
