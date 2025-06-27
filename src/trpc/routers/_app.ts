import { createTRPCRouter } from '../init';
import { authRouter } from '@/modules/auth/server/procedure';
import { categoriesRouter } from '@/modules/categories/server/procedure';
import { checkoutRouter } from '@/modules/checkout/server/procedure';
import { libraryRouter } from '@/modules/library/server/procedure';
import { productsRouter } from '@/modules/products/server/procedure';
import { tagsRouter } from '@/modules/tags/server/procedure';
import { tenantsRouter } from '@/modules/tenants/server/procedures';
export const appRouter = createTRPCRouter({

  tags: tagsRouter,
  auth: authRouter,
  tenants: tenantsRouter,
  categories: categoriesRouter,
  products: productsRouter,
  checkout: checkoutRouter,
  library: libraryRouter
}) // export type definition of API

export type AppRouter = typeof appRouter;
