import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TenantCart {
  productIds: string[];

}
interface CartState {
  tenantCarts: Record<string, TenantCart>;
  addProduct: (tenantSlug: string, productId: string) => void;
  removeProduct: (tenantSlug: string, productId: string) => void;
  clearCart: (tenantSlug: string) => void;
  clearAllCarts: () => void;
  getCartByTenant: (tenantSlug: string) => string[];

}

const useCarteStore = create<CartState>()(
  persist(
    (set, get) => ({
      tenantCarts: {},
      addProduct: (tenantSlug, productId) => set((state) => ({
        tenantCarts: {
          ...state.tenantCarts,
          [tenantSlug]: {
            productIds: [
              ...(state.tenantCarts[tenantSlug]?.productIds || []),
              productId
            ]
          }
        }
      })),
      removeProduct: (tenantSlug, productId) => set((state) => ({
        tenantCarts: {
          ...state.tenantCarts,
          [tenantSlug]: {
            productIds: state.tenantCarts[tenantSlug]?.productIds.filter(
              (id) => id !== productId
            ) || [],
          }
        }
      })),
      clearCart: (tenantSlug) => set((state) => ({
        tenantCarts: {
          ...state.tenantCarts,
          [tenantSlug]: {
            productIds: []
          }
        }
      })),
      clearAllCarts: () => set({
        tenantCarts: {}
      }),
      getCartByTenant: (tenantSlug) => {
        console.log("prodcuts ids on store", get().tenantCarts[tenantSlug]?.productIds || [] )
        return get().tenantCarts[tenantSlug]?.productIds || []
      },
    }),
    {
      name: "funroad",
      storage: createJSONStorage(() => localStorage)
    }
  )
)
export default useCarteStore;
