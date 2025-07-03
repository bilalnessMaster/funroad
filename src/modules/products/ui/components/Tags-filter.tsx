"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { DEFAULT_LIMIT } from "@/lib/constant";


interface Props {
  value: string[] | null;
  onChange: (value: string[]) => void;
}

export const TagsFilter = ({ value, onChange }: Props) => {
  const trpc = useTRPC();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(trpc.tags.getMany.infiniteQueryOptions({
    limit: DEFAULT_LIMIT, 
  }, {
    getNextPageParam: (lastPage) => {
      return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
    }
  }))
  const onClick = (tag: string) => {
    if (value?.includes(tag)) {
      onChange(value?.filter((t: string) => t !== tag) || [])
    } else {
      onChange(
        [
          ...(value || []), tag
        ]
      )
    }

  }
  return (
    <div className="flex flex-col  gap-y-2 ">
      {
        isLoading ? (
          <div>
            <LoaderIcon className="size-5 animate-spin" />
          </div>
        ) : (
          data?.pages.map((page) => page.docs.map((tag) => (

            <div
              key={tag.id}
              className="flex items-center justify-between cursor-pointer "
              onClick={() => onClick(tag.name) }
            >
              <p className="font-medium">{tag.name}</p>
          <Checkbox checked={value?.includes(tag.name)} onCheckedChange={() => { }} className="cursor-pointer" />
            </div>))))} {
        hasNextPage && (
          <button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="underline font-medium cursor-pointer justify-start text-start disabled:opacity-50"
          >
            load more...
          </button>
        )
      }
    </div>
  )
} 
