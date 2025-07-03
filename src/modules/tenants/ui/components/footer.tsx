import Link from 'next/link'
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const poppins= Poppins({
  subsets : ['latin'],
  weight :["700"] 
})


const Footer = () => {


  return (
    <footer className="h-10 border-t font-medium bg-white ">
      <div className="max-w-(--breakpoint-xl) mx-auto  flex py-6 items-center gap-1 h-full px-4  lg:px-12 ">
        <p className="-">
          Power by
        </p>
        <Link href={`${process.env.NEXT_PUBLIC_APP_URL!}`}>
        <span className={cn('text-2xl font-semibold', poppins.className)}>
        funroad
        </span>
        </Link>
      </div>
    </footer>

  )

}

export default Footer;
