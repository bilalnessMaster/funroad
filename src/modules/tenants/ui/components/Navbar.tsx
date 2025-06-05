'use client'

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from 'next/image'
import { generateTenantURL } from "@/lib/utils";



const Navbar = ({
  slug
}: { slug: string }) => {
  const trpc = useTRPC()
  const { data } = useQuery(trpc.tenants.getOne.queryOptions({
    slug
  }))
  console.log(data)
  return (
    <nav className="h-20 border-b font-medium bg-white ">
      <div className="max-w-(--breakpoint-xl) mx-auto  flex justify-between items-center h-full px-4  lg:px-12 ">
        <Link href={generateTenantURL(slug)} className="flex items-center gap-1 ">
        {data?.image?.url && (
              <Image src={data?.image?.url}
                width={32}
                height={32}
                className="rounded-full border shrink-0 size-[32px]"
                alt={slug} />
            )
          }
          <p className="text-xl">{data?.slug} </p>
        </Link>
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
