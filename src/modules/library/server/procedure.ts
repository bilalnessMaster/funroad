
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { Media, Tenant } from "@/payload-types";
import { TRPCError } from "@trpc/server";


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
        depth: 2,
        where: {
          id: {
            in: productIds
          }
        }
      })
      const ProductWithReviews = await Promise.all(
        products.docs.map(async (product) => {
          const reviews = await ctx.db.find({
            collection: "reviews",
            pagination: false,
            where: {
              product: {
                equals: product.id
              }
            }
          })
          return {
            ...product,
            reviewsCount: reviews.totalDocs,
            reviewsRating: reviews.docs.length === 0 ? 0 : reviews.docs.reduce((acc, review) => acc += review.rating, 0) / reviews.totalDocs
          }
        })
      )
      return {
        ...ProductWithReviews,
        docs: ProductWithReviews.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },

        }))
      };
    }),
  getOne: protectedProcedure
    .input(z.object({
      productId: z.string()
    }))
    .query(async ({ ctx, input }) => {
      console.log('product id ', input.productId)
      const data = await ctx.db.find({
        collection: 'orders',
        pagination: true,
        depth: 0,
        where: {
          and: [
            {
              product: {

                equals: input.productId
              }
            },
            {
              user: {
                equals: ctx.session.user.id
              }
            }
          ]
        }
      })

      const order = data.docs[0]

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found"
        })
      }

      const product = await ctx.db.findByID({
        collection: "products",
        id: order.product
      })
      return product;

    })



})
