'use client'
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCart } from "../../hooks/use-cart";
import { useEffect } from "react";
import { toast } from "sonner";
import { generateTenantURL } from "@/lib/utils";
import { CheckoutItem } from "../components/checkout-item";
import { CheckoutSidebar } from "../components/checkout-sidebar";
import { InboxIcon, Loader } from "lucide-react";
import { useCheckoutStates } from "../../hooks/use-checkout-states";
import { useRouter } from "next/navigation";

interface Props {
  tenantSlug: string

}

const CheckoutView = ({ tenantSlug }: Props) => {
  const router = useRouter()
  const [states, setStates] = useCheckoutStates()
  const { productIds, clearCart, clearAllCarts, removeProduct } = useCart(tenantSlug);
  const trpc = useTRPC()
  const { data, error, isPending } = useQuery(trpc.checkout.getProducts.queryOptions({
    ids: productIds,
  }))

  const purchase = useMutation(trpc.checkout.purchase.mutationOptions({
    onMutate: () => {
      setStates({ success: false, cancel: false })
    },
    onSuccess: (data) => {
      window.location.href = data.url;

    },
    onError: (error) => {
      if (error?.data?.code === 'UNAUTHORIZED'){
        router.push('/sign-in')
      }
      toast.error(error.message)
    }
  }))


  useEffect(() => {
    if (states.success) {
      clearCart();
      router.push('/products')
    }

  }, [states.success])

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearCart();
      toast.warning("Invalid products found, cart cleared")
    }

  }, [error, clearCart])
  if (isPending) {
    return (
      <div className="lg:pt-16 pt-4 lg:px-12 border mt-4 border-black border-dashed flex items-center justify-center p-8 flex-col bg-white w-full rounded-lg">
        <Loader className="animate-spin text-muted-foreground" />
        <p className="text-base font-medium">loading ..</p>
      </div>
    )

  }
  if (data?.totalDocs === 0) {
    return (
      <div className=" lg:pt-16 pt-4 lg:px-12 mt-4 border border-black border-dashed flex items-center justify-center p-8 flex-col bg-white w-full rounded-lg">
        <InboxIcon />
        <p className="text-base font-medium">No product found</p>
      </div>
    )
  }
  return (
    <div className="lg:pt-16 pt-4 lg:px-12  ">
      <div className="grid grid-cols-1  lg:grid-cols-7 gap-4 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden bg-white ">
            {
              data?.docs.map((product, index) => (
                <CheckoutItem
                  key={product.id}
                  id={product.id}
                  isLast={index === data.docs.length}
                  imageUrl={product.image?.url || '/placeholder.png'}
                  name={product.name}
                  productUrl={`${generateTenantURL(product.tenant.slug)}/products/${product.id}`}
                  tenantUrl={generateTenantURL(product.tenant.slug)}
                  tenantName={product.tenant.name}
                  price={product.price}
                  onRemove={() => removeProduct(product.id)}
                />
              ))
            }
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={data?.totalPrice || 0}
            onPurchase={() => purchase.mutate({ ids: productIds, tenantSlug })}
            disabled={purchase.isPending}
            isCanceled={states.cancel}

          />
        </div>
      </div>
    </div>

  )
}

export default CheckoutView;
