import { Button } from "@/components/ui/button";
import { useCart } from "../../hooks/use-cart";
import { cn, generateTenantURL } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";


interface CheckoutButtonProps {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}



export const CheckoutButton = ({ className, hideIfEmpty, tenantSlug }: CheckoutButtonProps) => {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems == 0) return null;

  return (
    <Button className={cn("bg-white", className)} asChild variant={"elevated"}>
      <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
        <ShoppingCart className="" hideIfEmpty /> {totalItems > 0 ? totalItems : ""}
      </Link>
    </Button>
  )

}


