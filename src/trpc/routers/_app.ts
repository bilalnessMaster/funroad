import { createTRPCRouter } from '../init';
import { authRouter } from '@/modules/auth/server/procedure';
import { categoriesRouter } from '@/modules/categories/server/procedure';
import { productsRouter } from '@/modules/products/server/procedure';
import { tagsRouter } from '@/modules/tags/server/procedure';
export const appRouter = createTRPCRouter({
    tags : tagsRouter,
    auth: authRouter,
    categories: categoriesRouter, 
    products : productsRouter }); // export type definition of API
export type AppRouter = typeof appRouter;
