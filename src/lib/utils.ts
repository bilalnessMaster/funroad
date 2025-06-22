import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const generateTenantURL = (tenantSlug: string) => {

  return `/tenant/${tenantSlug}`


}

export const formatCurrency = (price: string | number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,

  }).format(Number(price))
}
