import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const generateTenantURL = (tenantSlug : string) =>{

   return `/tenant/${tenantSlug}`


}
