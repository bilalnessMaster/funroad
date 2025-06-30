import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import Link from "next/link";

interface Props {
  tenantSlug: string;
  productId: string;
  isPurchase?: boolean
}

export const CartButton = ({ isPurchase, tenantSlug, productId }: Props) => {
  if (isPurchase) {
    return (
      <Button variant={'elevated'} asChild className="flex-1 font--medium bg-pink-400">
        <Link href={`/library/${productId}`}>
          View in library
        </Link>

      </Button>

    )
  }
  const cart = useCart(tenantSlug);
  console.log(
    cart.isProductInCart(productId)
  )
  return (
    <Button
      onClick={() => cart.toggleProduct(productId)}
      variant={"elevated"}
      className={cn("flex-1 bg-pink-400", { "bg-white": cart.isProductInCart(productId) })} >
      {
        cart.isProductInCart(productId) ?
          "remove from cart" :
          'Add to cart'
      }
    </Button>

  )
}
