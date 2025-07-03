'use client'
import { ReviewsGetOneOutput } from "@/modules/reviews/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StarPicker } from "@/components/star-picker";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Description } from "@radix-ui/react-dialog";
import { toast } from "sonner";


interface Props {
  productId: string;
  initialData?: ReviewsGetOneOutput;
}
const formSchema = z.object({
  description: z.string().min(1, { message: "description is required" }),
  rating: z.number().min(1, { message: "Rating is requeried" }).max(5),
})

export const ReviewForm = ({ productId, initialData }: Props) => {
  console.log("this is the initial date for review", initialData)
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const [isPreview, setIsPreview] = useState(!!initialData)

  const createReview = useMutation(trpc.reviews.create.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.reviews.getOne.queryOptions({
        productId
      }))
      toast.success("Your review has beed created")
      console.log('success')
    },
    onError: (error) => {
      toast.error(error.message)
      console.log('success')
    }
  }))

  const updateReview = useMutation(trpc.reviews.update.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries(trpc.reviews.getOne.queryOptions({
        productId
      }))
      toast.success("Your review has beed updated")
      console.log('success')
    },
    onError: (error) => {
      toast.error(error.message)
      console.log('success')
    }
  }))

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: initialData?.rating ?? 0,
      description: initialData?.description ?? ""
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (initialData) {
      updateReview.mutate({
        reviewId: initialData.id,
        rating: data.rating,
        description: data.description
      })
    } else {
      createReview.mutate({
        productId: productId,
        rating: data.rating,
        description: data.description
      })
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-4 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="font-medium">
          {isPreview ? "Your review" : "liked it ? give a review"}
        </p>
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <StarPicker disabled={isPreview} value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Want to leave a written reveiw" disabled={isPreview} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {
          !isPreview && (
            <Button
              variant={'elevated'}
              disabled={createReview.isPending || updateReview.isPending}
              type="submit"
              size={'lg'}
              className="bg-black text-white hover:bg-pink-400 hover:text-primary w-fit"
            >
              {
                !!initialData ? "Update review" : "Post review"
              }
            </Button>
          )
        }
      </form>
      {
        isPreview && (
          <Button
            onClick={() => setIsPreview(false)}
            variant={'elevated'}
            disabled={false}
            type="submit"
            size={'lg'}
            className=" w-fit mt-4"
          >
            Edit
          </Button>
        )
      }


    </Form>


  )
}


export const ReviewFormSkeleton = () => {

  return (
    <form
      className="flex flex-col gap-y-4 "
    >
      <p className="font-medium">
        liked it ? give a review"
      </p>
      <StarPicker disabled />
      <Textarea placeholder="Want to leave a written reveiw" disabled />

      <Button
        variant={'elevated'}
        disabled
        type="submit"
        size={'lg'}
        className="bg-black text-white hover:bg-pink-400 hover:text-primary w-fit"
      >

        "Post review"

      </Button>
    </form>

  )
}
