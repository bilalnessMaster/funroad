import { useCallback } from "react";
import useCarteStore from "../store/use-cart-store";
// import { useShallow } from 'zustand/react/shalllow'


export const useCart = (tenantSlug: string) => {
  const clearAllCarts = useCarteStore((state) => state.clearAllCarts)
  const addProduct = useCarteStore((state) => state.addProduct)
  const clearCart = useCarteStore((state) => state.clearCart)
  const removeProduct = useCarteStore((state) => state.removeProduct)

  const productIds = useCarteStore((state) => state.tenantCarts[tenantSlug]?.productIds || []);

  const toggleProduct = useCallback((productId: string) => {
    if (productIds.includes(productId)) {
      removeProduct(tenantSlug, productId);
    } else {
      addProduct(tenantSlug, productId);
    }
  }, [addProduct, removeProduct, productIds])

  const isProductInCart = useCallback((productId: string) => {
    return productIds.includes(productId);
  }, [productIds])

  const clearTenantCart = useCallback(() => {
    clearCart(tenantSlug);
  }, [clearCart, tenantSlug])


  const handleAddProduct = useCallback((productId: string) => {
    addProduct(tenantSlug, productId)
  }, [addProduct, tenantSlug])

  const handleRemoveProduct = useCallback((productId: string) => {
    removeProduct(tenantSlug, productId)
  }, [removeProduct, tenantSlug])

  return {
    productIds,
    addProduct: handleAddProduct,
    clearCart: clearTenantCart,
    clearAllCarts,
    removeProduct: handleRemoveProduct,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,

  }
} 
