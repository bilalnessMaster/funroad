'use client'
import React, { useState } from 'react'
import { Poppins } from 'next/font/google'
import Link from 'next/Link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import NavbarSidebar from './navbar-sidebar'
import { MenuIcon } from 'lucide-react'
const poppin = Poppins({
    subsets: ['latin'],
    weight: ['700']
})

const links = [
    {
        href: "/",
        children: "home"
    },
    {
        href: "/about",
        children: "about"
    },
    {
        href: "/feature",
        children: "feature"
    },
    {
        href: "/pricing",
        children: "pricing"
    },
]
interface NavbarItemProps {
    href: string,
    children: React.ReactNode,
    isActive?: boolean
}
const Navbar = () => {

    const pathName = usePathname()
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    return (
        <nav className='h-20 flex border-b justify-between font-medium bg-white'>
            <Link href={'/'} className='pl-6 items-center flex'>
                <span className={cn('text-5xl font-semibold', poppin.className)}>funroad</span>
            </Link>
            <NavbarSidebar items={links} open={isSideBarOpen} onOpenChange={setIsSideBarOpen} />
            <div className='items-center gap-4 hidden lg:flex '>
                {
                    links.map(({ href, children }, index) => (
                        <NavbarItem key={index} href={href} isActive={pathName === href}>
                            {children}
                        </NavbarItem>
                    ))
                }
            </div>
            <div className='hidden lg:flex '>
                <Button
                    variant='secondary'
                    className='border-l border-t-0 border-b-0 border-r-0  px-12 h-full  rounded-none bg-white hover:bg-pink-400 transition-colors text-lg'
                >
                    <Link href={'/login'}>
                        Login
                    </Link>
                </Button>
                <Button
                    className='border-l border-t-0 border-b-0 border-r-0  px-12 h-full  rounded-none bg-black text-white  hover:bg-pink-400 hover:text-black transition-colors text-lg'
                >
                    <Link href='/sign-up'>
                        Start selling
                    </Link>
                </Button>
            </div>
            <div className='flex lg:hidden items-center'>
                <Button
                    variant={'ghost'}
                    className='size-12 border-transparent bg-white'
                    onClick={() => setIsSideBarOpen(true)}
                >
                    <MenuIcon />
                </Button>
            </div>
        </nav>
    )
}

export default Navbar;

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
    return (
        <Button
            variant={'outline'}
            className={cn(
                'bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg',
                { 'bg-black text-white  hover:bg-black hover:text-white': isActive }
            )}
        >
            <Link href={href}>
                {children}
            </Link>
        </Button>
    )
}