import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { equal } from "assert";
export const reviewRouter = createTRPCRouter({
  getOne: protectedProcedure.input(
    z.object({
      productId: z.string(),
    })
  )
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.findByID({
        collection: 'products',
        id: input.productId
      })
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "product not found"
        })
      }
      const reviewsData = await ctx.db.find({
        collection: "reviews",
        limit: 1,
        where: [
          {
            product: {
              equals: product.id

            }
          },
          {
            user: {
              equals: ctx.session.user.id
            }
          }
        ]
      })
      const review = reviewsData.docs[0]
      console.log(review)
      if (!review) {
        return null
      }

      return review;
    }),
  create: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        rating: z.number().min(1, { message: "Rating is required" }),
        description: z.string().min(1, { message: "description is required" })
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.findByID({
        collection: 'products',
        id: input.productId
      })

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "product not found"
        })
      }

      const exitingreviewsData = await ctx.db.find({
        collection: 'reviews',
        limit: 1,
        where: {
          and: [
            {
              user: {
                equals: ctx.session.user.id
              }
            },
            {
              product: {
                equals: product.id
              }
            }
          ]
        }
      })

      const exitingreview = exitingreviewsData.docs[0]

      if (exitingreview) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "you already reviewed this product "
        })
      }

      const review = await ctx.db.create({
        collection: 'reviews',
        data: {
          user: ctx.session.user.id as string,
          product: product.id,
          rating: input.rating,
          description: input.description
        }
      });

      return review;
    }),
  update: protectedProcedure
    .input(
      z.object({
        reviewId: z.string(),
        rating: z.number().min(1, { message: "Rating is required" }),
        description: z.string().min(1, { message: "description is required" })
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exitingReview = await ctx.db.findByID({
        collection: 'reviews',
        depth: 0,
        id: input.reviewId
      })

      if (!exitingReview) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "review not found"
        })
      }
      if (exitingReview.user !== ctx.session.user.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Your are not allowed to update this review"
        })
      }


      const review = await ctx.db.update({
        collection: 'reviews',
        id: input.reviewId,
        data: {
          user: ctx.session.user.id as string,
          rating: input.rating,
          description: input.description
        }
      });

      return review;
    })
})
