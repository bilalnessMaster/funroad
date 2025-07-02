'use client'

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const Page = () => {
  const trpc = useTRPC()
  const router = useRouter()
  const { mutate: verify } = useMutation(trpc.checkout.verify.mutationOptions({
    onSuccess: (data) => {
      window.location.href = data.url
    },
    onError: () => {
      router.push('/')
    }
  }));
  useEffect(() => {
    verify()
  }, [verify])
  return (
    <div className="flex h-screen items-center justify-center ">
      <LoaderCircleIcon className="animate-spin text-black" />
    </div>
  )
}


export default Page;
