import useCarteStore from "../store/use-cart-store";



export const useCart = (tenantSlug: string) => {
  const {
    getCartByTenant,
    clearAllCarts,
    clearCart,
    removeProduct,
    addProduct,
  } = useCarteStore()


  const productIds = getCartByTenant(tenantSlug);
  console.log("prodcuts ids" ,productIds)
  const toggleProduct = (productId: string) => {
    if (productIds.includes(productId)) {
      removeProduct(tenantSlug, productId);
    } else {
      addProduct(tenantSlug, productId);
    }
  }
  const isProductInCart = (productId: string) => {
    return productIds.includes(productId);
  }
  const clearTenantCart = () => {
    clearCart(tenantSlug);
  }

  return {
    productIds,
    addProduct: (productId: string) => addProduct(tenantSlug, productId),
    clearCart: clearTenantCart,
    clearAllCarts,
    removeProduct : (productId : string) => removeProduct(tenantSlug , productId),
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,

  }
} 
