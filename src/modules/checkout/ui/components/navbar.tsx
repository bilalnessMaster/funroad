
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
    loading: () => <Button disabled className="bg-white" variant={'elevated'}>
      <Loader className="animate-spin" />
    </Button>
  }
)




const Navbar = ({
  slug
}: { slug: string }) => {
  return (
    <nav className="h-20 border-b font-medium bg-white ">
      <div className="max-w-(--breakpoint-xl) mx-auto  flex justify-between items-center h-full px-4  lg:px-12 ">
        <p className="text-xl">Checkout</p>
        <Button
          variant={"elevated"}
          asChild

        >
          <Link href={generateTenantURL(slug)}>
            Continue shopping
          </Link>
        </Button>
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
