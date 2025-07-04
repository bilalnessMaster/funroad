import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const generateTenantURL = (tenantSlug: string) => {
// this because I can use the subdomain on vercel (I dont have the domain to try on)
    return `${process.env.NEXT_PUBLIC_APP_URL}/tenant/${tenantSlug}`

  if (process.env.NODE_ENV === 'development') {
    return `${process.env.NEXT_PUBLIC_APP_URL}/tenant/${tenantSlug}`
  }

  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!
  console.log('the root dommain ', domain)
  console.log("it reach here")
  return `${protocol}://${tenantSlug}.${domain}`
}

export const formatCurrency = (price: string | number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,

  }).format(Number(price))
}
