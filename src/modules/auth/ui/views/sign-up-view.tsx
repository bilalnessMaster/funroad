'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterSchema } from "../../schemas"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useMutation } from "@tanstack/react-query"



const SignUpView = () => {
  const trpc =  useTRPC();
  const register = useMutation(trpc.auth.register.mutationOptions())
  const form = useForm<z.infer<typeof RegisterSchema>>({
    mode: "all",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })


  function onSubmit(values: z.infer<typeof RegisterSchema>) {

    register.mutate(values)
    console.log(values)
  }

  const username = form.watch("username");
  const usernameErrors = form.formState.errors.username;

  const showPreview = username && !usernameErrors;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#f4f4f0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 p-4 lg:p-16">
            <div className="flex items-center justify-between mb-8">
              <Link href='/'>
                <span className={cn("text-2xl font-sembold")}>
                  funroad
                </span>
              </Link>

              <Button className="text-base border-none  underline-offset-2 underline  " asChild variant="elevated" size={'sm'} type="submit">
                <Link href="/sign-in" prefetch>
                  Sign in
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium ">
              Join over 100 creators earning money on Funrod
            </h1>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription className={cn("hidden", showPreview && "block")}>
                    Your store will be available at&nbsp;
                    <strong>{username}</strong>.shop.com
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button disabled={register.isPending} className="bg-black text-white font-medium  hover:bg-pink-400 hover:text-primary" variant={"elevated"} size={"lg"} type="submit">Create account</Button>
            </form>
        </Form>
      </div>
      <div className="h-screen w-full lg:col-span-2 hidden lg:block" style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundPosition: 'center' }}>

      </div>
    </div>
  )
}


export default SignUpView;
