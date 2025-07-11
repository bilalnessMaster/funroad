import { DEFAULT_LIMIT } from "@/lib/constant";
import { LibraryView } from "@/modules/library/ui/view/library-view"
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic =  "force-dynamic"
const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.library.getMany.infiniteQueryOptions({ limit: DEFAULT_LIMIT }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
      <LibraryView />
    </HydrationBoundary>
  )
}


export default Page;
