import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

interface NavbarItem {
    href: string,
    children: React.ReactNode
}
interface Props {
    items: NavbarItem[],
    open: boolean,
    onOpenChange: (open: boolean) => void;
}
const NavbarSidebar = ({
    items,
    open,
    onOpenChange
}: Props) => {
    return (
        <Sheet onOpenChange={onOpenChange} open={open}>
            <SheetContent
                side='left'
                className='p-0 transition-none '
            >
                <SheetHeader className='p-4 border-b '>
                    <div className='flex items-center '>
                        <SheetTitle>Menu</SheetTitle>
                    </div>
                </SheetHeader>
                <ScrollArea className='flex flex-col overflow-y-auto h-full  m-0 p-0'>
                    {
                        items.map(({ href, children }, index) => (
                            <Link key={index} href={href}
                                onClick={() => onOpenChange(false)}
                                className='w-full text-left  px-4 py-4 hover:bg-black hover:text-white flex items-center  text-base font-medium'>
                                {children}
                            </Link>
                        ))
                    }
                    <div className='border-t '>
                        <Link
                            className='w-full text-left  p-4 hover:bg-black hover:text-white flex items-center  text-base font-medium'
                            onClick={() => onOpenChange(false)}
                            href={'/sign-in'}>
                            Login
                        </Link>
                        <Link
                            className='w-full text-left  p-4 hover:bg-black hover:text-white flex items-center  text-base font-medium'
                            onClick={() => onOpenChange(false)}
                            href={'/sign-in'}>
                            Start selling
                        </Link>

                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>

    )
}

export default NavbarSidebar