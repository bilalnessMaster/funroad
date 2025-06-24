'use client'

import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from 'next/image'
import { generateTenantURL } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const CheckoutButton = dynamic(
  () => import("../../../checkout/ui/components/checkout-button").then(
    (mod) => mod.CheckoutButton
  ),
  {
    ssr: false,
    loading: () => <Button disabled className="flex-1 bg-pink-400" variant={'elevated'}>
      <Loader className="animate-spin" />
    </Button>
  }
)




const Navbar = ({
  slug
}: { slug: string }) => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({
    slug
  }))
  return (
    <nav className="h-20 border-b font-medium bg-white ">
      <div className="max-w-(--breakpoint-xl) mx-auto  flex justify-between items-center h-full px-4  lg:px-12 ">
        <Link href={generateTenantURL(slug)} className="flex items-center gap-1 ">
          {
            data.image?.url && (
              <Image src={data.image?.url}
                width={32}
                height={32}
                priority
                className="rounded-full border shrink-0 size-[32px]"
                alt={slug || "empty"} />
            )
          }
          <p className="text-xl">{data.slug} </p>
        </Link>
        <CheckoutButton   hideIfEmpty tenantSlug={slug} />
      </div>
    </nav>

  )

}

export default Navbar;

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white ">
      <div className="max-w-(--breakpoint-xl) mx-auto  flex justify-between items-center h-full px-4  lg:px-12 ">
      </div>
    </nav>

  )

}
