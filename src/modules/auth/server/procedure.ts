import { headers as getHeaders, cookies as getCookies } from 'next/headers'
import { baseProcedure, createTRPCRouter } from "@/trpc/init"; import { TRPCError } from '@trpc/server';
import { AUTH_COOKIE } from '../constants';
import { loginSchema, RegisterSchema, } from '../schemas';
import { generateAuthCookie } from '../utils';
export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({ headers })
    return session;
  }),
  register: baseProcedure
    .input(
      RegisterSchema
    ).mutation(async ({ input, ctx }) => {

      const data = await ctx.db.find(
        {
          collection: "users",
          where: {
            usersname: {
              equals: input.username

            }
          },
          limit: 1
        }
      )

      const existingUser = data.docs[0]

      if (!existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken"
        }) }
      await ctx.db.create({
        collection: 'users',
        data: {
          email: input.email,
          password: input.password, // this will be hashed
          username: input.username,
        }
      })
    }),
  login: baseProcedure
    .input(
      loginSchema
    ).mutation(async ({ input, ctx }) => {
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password
        }
      })


      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: 'failed to login'
        })
      }

      // this is import for tto make sure subdomain share same cookies as the main one
      await generateAuthCookie({ value: data.token, prefix: ctx.db.config.cookiePrefix })
      return data;

    }),
  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE)
  })

})
