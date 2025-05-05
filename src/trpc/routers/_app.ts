import { createTRPCRouter } from '../init';
import { authRouter } from '@/modules/auth/server/procedure';
import { categoriesRouter } from '@/modules/categories/server/procedure';
export const appRouter = createTRPCRouter({
    auth: authRouter,
    categories: categoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
