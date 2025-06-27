'use client'

import StarRating from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import dynamic from "next/dynamic";
import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Link2, Loader, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
// import { CartButton } from "../components/cart-button";

const CartButton = dynamic(
  () => import("../components/cart-button").then(
    (mod) => mod.CartButton
  ),
  {
    ssr: false,
    loading: () => <Button disabled className="flex-1 bg-pink-400" variant={'elevated'}>
      <Loader className="animate-spin" />
    </Button>
  }
)

interface Props {
  productId: string;
  tenantSlug: string;

}



const ProductView = ({ productId, tenantSlug }: Props) => {
  const trpc = useTRPC()
  
  const { data: product } = useSuspenseQuery(trpc.products.getOne.queryOptions({
    id: productId
  }))

  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border rounded-sm bg-white overflow-hidden ">
        <div className="relative aspect-[3.9] borde-b">
          <Image
            fill
            className="object-cover"
            src={product.image?.url || '/placeholder.png'}
            alt={product.image?.alt || product.name} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6 ">
          <div className="col-span-4">
            <div className="p-6">
              <h1 className="text-4xl font-medium ">{product.name}</h1>
            </div>
            <div className="border-y flex">
              <div className="px-6 py-4 flex items-center justify-center border-r">
                <div className="relative px-3 py-1 border bg-pink-400 w-fit ">
                  <p className="text-base font-medium">{formatCurrency(product.price)}</p>
                </div>
              </div>
              <div className="px-6 py-4 flex items-center justify-center lg:border-r">
                <Link href={generateTenantURL(tenantSlug)} className="flex items-center gap-2">
                  {
                    product.tenant.image?.url && (
                      <Image
                        src={product.tenant.image?.url}
                        alt={product.tenant.name}
                        width={20}
                        height={20}
                        className="rounded-full border shrink-0 size-[20px]"
                      />
                    )
                  }
                  <p className="text-base underline font-medium">{product.tenant.name}</p>
                </Link>
              </div>
              <div className="hidden lg:flex px-6 py-4 items-center  justify-center">
                <div className="flex items-center gap-1">
                  <StarRating
                    rating={3}
                    iconClassName="size-4" />
                </div>

              </div>
            </div>
            <div className="block lg:hidden px-6 py-4 items-center justify-center border-b ">
              <div className="flex items-center gap-1">
                <StarRating
                  rating={3}
                  iconClassName="size-4" />
                <p className="text-base font-medium">
                  {5} ratings
                </p>

              </div>
            </div>
            <div className="p-6 ">
              {
                product.description ? (
                  <p> {product.description}</p>
                ) :
                  (
                    <p className="font-medium text-muted-foreground italic">No description procided</p>
                  )
              }
            </div>
          </div>
          <div className="col-span-2 ">
            <div className="border-t lg:border-t-0 lg:border-l h-full ">
              <div className="flex flex-col gap-4 p-6 border-b ">
                <div className="flex flex-row items-center gap-2 ">
                  <CartButton isPurchase={product.isPurchase} tenantSlug={tenantSlug} productId={productId} />
                  <Button
                    variant={"elevated"}
                    className=""
                    disabled
                  >
                    <Link2 className="size-4" />
                  </Button>
                </div>
                <p className="text-center font-medium ">
                  {
                    product.refundPolicy === 'no-refund' ?
                      "No refunds" :
                      product.refundPolicy
                  }
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl fonnt-medium ">Ratings</h3>
                  <div className="flex items-center gap-x-1 font-medium">
                    <StarIcon className="size-4 fill-black" />
                    <p>({5})</p>
                    <p className="text-base">{5} ratings</p>
                  </div>
                </div>
                <div
                  className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4"
                >
                  {
                    [5, 4, 3, 2, 1].map((star) => (
                      <Fragment key={star}>
                        <div className="font-medium">
                          {star} {star === 1 ? "star" : "stars"}
                        </div>
                        <Progress value={star} className="h-[1lh]" />
                        <div>{star}%</div>
                      </Fragment>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ProductView;
