'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "../../schemas"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"



const SignInView = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient()
  const router = useRouter()
  const login = useMutation(trpc.auth.login.mutationOptions({
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.auth.session.queryFilter())
      router.push("/")
    }
  }))
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  function onSubmit(values: z.infer<typeof loginSchema>) {

    login.mutate(values)
    console.log(values)
  }


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


            <Button disabled={login.isPending} className="bg-black text-white font-medium  hover:bg-pink-400 hover:text-primary" variant={"elevated"} size={"lg"} type="submit">Create account</Button>
          </form>
        </Form>
      </div>
      <div className="h-screen w-full lg:col-span-2 hidden lg:block" style={{ backgroundImage: "url('/background.png')", backgroundSize: "cover", backgroundPosition: 'center' }}>

      </div>
    </div>
  )
}


export default SignInView;
