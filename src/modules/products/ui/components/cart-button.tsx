import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";

interface Props {
  tenantSlug: string;
  productId: string;
}

export const CartButton = ({ tenantSlug, productId }: Props) => {
  const cart = useCart(tenantSlug);
  console.log(
        cart.isProductInCart(productId) 
  )
  return (
    <Button 
    onClick={()=> cart.toggleProduct(productId)}
    variant={"elevated"} 
    className={cn("flex-1 bg-pink-400", {"bg-white":cart.isProductInCart(productId)})} >
      {
        cart.isProductInCart(productId) ?
          "remove from cart" :
          'Add to cart'
      }
    </Button>

  )
}
