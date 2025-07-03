
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { Media, Tenant } from "@/payload-types";
import { TRPCError } from "@trpc/server";
import type Stripe from "stripe";
import { CheckoutMetadata, ProductMetadata } from "../types";
import { stripe } from "@/lib/stripe";
import { PLATFOR_FEE } from "@/lib/constant";
export const checkoutRouter = createTRPCRouter({
  purchase: protectedProcedure.input(z.object({
    ids: z.array(z.string()).min(1),
    tenantSlug: z.string().min(1),
  })).mutation(async ({ ctx, input }) => {

    const data = await ctx.db.find({
      collection: "products",
      depth: 2,
      pagination: false,
      select: {
        content: false
      },
      where: {
        and: [
          {
            id: {
              in: input.ids
            }
          },
          {
            "tenant.slug": {
              equals: input.tenantSlug
            }
          },
          {
            isArchived: {
              not_equals: true

            }
          }
        ]


      }
    })

    if (data.totalDocs !== input.ids.length) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "product not found"
      })
    }

    const tenantData = await ctx.db.find({
      collection: "tenants",
      limit: 1,
      where: {
        slug: {
          equals: input.tenantSlug
        }
      }
    })

    const tenant = tenantData.docs[0]

    if (!tenant) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: "Tenant not found"
      })
    }
    if (!tenant.stripeDetailsSubmitted) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: "Tenant not allowed to sell products"
      })
    }
    const totalAmount = data.docs.reduce((acc, product) => acc += product.price * 100, 0)
    const platformFeeAmount = Math.round(totalAmount * (PLATFOR_FEE / 100))
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = data.docs.map((product) => ({
      quantity: 1,
      price_data: {
        unit_amount: parseInt(product.price) * 100,
        currency: "usd",
        product_data: {
          name: product.name,
          metadata: {
            stripeAccountId: tenant.stripeAccountId,
            id: product.id,
            name: product.name,
            price: parseInt(product.price),
          } as ProductMetadata
        }
      }
    }))
    const checkout = await stripe.checkout.sessions.create({
      customer_email: ctx.session.user.email,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenant/${input.tenantSlug}/checkout?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenant/${input.tenantSlug}/checkout?cancel=true`,
      mode: "payment",
      line_items: lineItems,
      invoice_creation: {
        enabled: true,
      },
      metadata: {
        userId: ctx.session.user.id,
      } as CheckoutMetadata,
      payment_intent_data: {
        application_fee_amount: platformFeeAmount
      }

    }, {
      stripeAccount: tenant.stripeAccountId
    })

    if (!checkout.url) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "failed to create checkout"
      })
    }


    return { url: checkout.url }
  }),
  getProducts: baseProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      })
    )
    .query(async ({ ctx, input }) => {

      const data = await ctx.db.find({
        collection: "products",
        select: {
          content: false
        },
        pagination: false,
        where: {
          and: [
            {
              id: {
                in: input.ids
              }
            },
            {
              isArchived: {
                not_equals: true
              }
            }
          ]

        }
      })
      if (data.totalDocs !== input.ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found"
        })
      }
      const totalPrice = data.docs.reduce((acc, obj) => {
        const price = Number(obj.price);
        return acc + (isNaN(price) ? 0 : price)
      }, 0)
      return {
        ...data,
        totalPrice,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },

        }))
      };

    }),
  verify: protectedProcedure
    .mutation(async ({ ctx }) => {
      const user = await ctx.db.findByID({
        collection: "users",
        depth: 0,
        id: ctx.session.user.id
      })
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "User not found"
        })
      }
      const tenantId = user.tenants?.[0]?.tenant as string;

      const tenant = await ctx.db.findByID({
        collection: "tenants",
        id: tenantId
      })
      if (!tenant) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "User not found"
        })
      }
      const accoutLink = await stripe.accountLinks.create({
        account: tenant.stripeAccountId,
        refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin`,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin`,
        type: "account_onboarding"
      })
      if (!accoutLink) {
        throw new TRPCError({
          code: 'BAD_GATEWAY',
          message: "failed to create accountlink"
        })
      }

      return { url: accoutLink.url }
    })
})
