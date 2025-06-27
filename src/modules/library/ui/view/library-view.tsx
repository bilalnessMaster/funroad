import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import ProductList, { ProductsListSkeleton } from "../components/products-list"



export const LibraryView = () => {


  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#F4F4F0] w-full border-b">
        <Link prefetch href={'/'} className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="font-medium text-base">Continue shopping</span>
        </Link>
      </nav>
      <header className="bg-[#F4F4F0] py-8 border-b">
        <div className="max-w-(--breakpoint-xl) mx-auto lg:px-12 flex flex-col gap-y-4 ">
          <h1 className="text-[40px] font-medium">Library</h1>
          <p>
            Your purchase and reviews
          </p>


        </div>
      </header>
      <section className="max-w-(--breakpoint-xl) mx-auto lg:px-12 flex flex-col py-10 ">
        <Suspense fallback={<ProductsListSkeleton />}>
          <ProductList />
        </Suspense>

      </section>
    </div>
  )
}
