
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import type { Where } from 'payload'
import { Category } from "@/payload-types";
export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(z.object({
      category: z.string().nullable().optional(),


    }))
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth : 1 , 
          pagination: false,
          where: {
            slug: {
              equals: input.category
            }
          }
        })
        const formatedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({ ...(doc as Category) }))
        }))

        const subcategoriesSlug : string[] = [];
        const categoryParent = formatedData[0]

        if (categoryParent) {
            subcategoriesSlug.push(
              ...categoryParent.subcategories.map((subcategory)=> subcategory.slug)
            )
        }
        where['category.slug'] = {
          in: [categoryParent.slug, ...subcategoriesSlug]
        }
      }
      const data = await ctx.db.find({
        collection: 'products',
        pagination: true,
        depth: 1,
        where
      })
      return data;
    })
})
