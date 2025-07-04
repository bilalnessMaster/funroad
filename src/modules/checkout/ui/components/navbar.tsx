
'use client'

import Link from "next/link";
import { generateTenantURL } from "@/lib/utils";
import { Button } from "@/components/ui/button";






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
