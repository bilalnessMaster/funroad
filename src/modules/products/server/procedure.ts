import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import type { Sort, Where } from 'payload'
import { Category, Media, Tenant } from "@/payload-types";
import { sortValues } from "../hooks/use-products-filters";
import { headers as getHeaders } from "next/headers";


export const productsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const headers = await getHeaders()
      const session = await ctx.db.auth({ headers })
      let isPurchase = false
      const product = await ctx.db.findByID({
        collection: "products",
        id: input.id,
        select: {
          content: false
        }
      })
      if (session.user) {
        const orders = await ctx.db.find({
          collection: "orders",
          pagination: false,
          limit: 1,
          where: {
            and: [
              {
                user: {
                  equals: session.user.id
                }
              },
              {
                product: {
                  equals: input.id
                }
              }
            ]

          }
        })
        const order = !!orders.docs[0]
        if (order) {
          isPurchase = true
        }
      }
      const reviews = await ctx.db.find({
        collection: "reviews",
        pagination: false,
        where: {
          product: {
            equals: input.id
          }
        }
      })
      return {
        isPurchase,
        ...product,
        reviews,
        reviewsCount: reviews.totalDocs,
        reviewsRating: reviews.docs.length === 0 ? 0 : reviews.docs.reduce((acc, review) => acc += review.rating, 0) / reviews.totalDocs,
        image: product.image as Media | null,
        tenant: product.tenant as Tenant & { image: Media | null },
      }
    }),
  getMany: baseProcedure
    .input(z.object({
      cursor: z.number().default(1),
      limit: z.number().default(1),
      category: z.string().nullable().optional(),
      minPrice: z.string().nullable().optional(),
      maxPrice: z.string().nullable().optional(),
      tags: z.array(z.string()).nullable().optional(),
      sort: z.enum(sortValues as [string, ...string[]]).nullable().optional(),
      tenantSlug: z.string().nullable().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const where: Where = {
        price: {}
      };

      let sort: Sort = "-createdAt";

      if (input.sort === "curated") {
        sort = "name";
      }
      if (input.sort === "hot_and_new") {
        sort = "+createdAt";
      }
      if (input.sort === "trending") {
        sort = "-createdAt";
      }
      if (input.minPrice && input.maxPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
          less_than_equal: input.maxPrice
        }
      } else if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        }
      } else if (input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice
        }
      }


      if (input.tenantSlug) {
        where['tenant.slug'] = {
          equals: input.tenantSlug,
        }
      }
      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category
            }
          },
          select: {
            content: false
          }
        })
        const formatedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({ ...(doc as Category) }))
        }))

        const subcategoriesSlug: string[] = [];
        const categoryParent = formatedData[0]

        if (categoryParent) {
          subcategoriesSlug.push(
            ...categoryParent.subcategories.map((subcategory) => subcategory.slug)
          )
          where['category.slug'] = {
            in: [categoryParent.slug, ...subcategoriesSlug]
          }

        }
      }
      if (input?.tags && input?.tags?.length > 0) {
        where['tags.name'] = {
          in: input.tags,
        }

      }
      const data = await ctx.db.find({
        collection: 'products',
        pagination: true,
        depth: 2,
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      })
      const ProductWithReviews = await Promise.all(
        data.docs.map(async (product) => {
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
    })
})
