
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { Media, Tenant } from "@/payload-types";


export const libraryRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(z.object({
      cursor: z.number().default(1),
      limit: z.number().default(1),
    }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: 'orders',
        pagination: true,
        depth: 0,
        page: input.cursor,
        limit: input.limit,
        where: {
          user: {
            equals: ctx.session.user.id
          }
        }
      })

      const productIds = data.docs.map((order) => order.product)

      const products = await ctx.db.find({
        collection: "products",
        pagination: false,
        where: {
          id: {
            in: productIds
          }
        }
      })
      return {
        ...products,
        docs: products.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },

        }))
      };
    })
})
