import { cn, formatCurrency } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"


interface Props {
  isLast: boolean
  imageUrl?: string | undefined
  name: string
  productUrl: string
  tenantUrl: string
  tenantName: string
  id: string
  price: string
  onRemove: () => void


}



export const CheckoutItem = ({
  isLast,
  imageUrl,
  name,
  productUrl,
  tenantUrl,
  tenantName,
  id,
  price,
  onRemove,

}: Props) => {
  return (
    <div
      className={cn("grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b last:border-b-0")}
    >
      <div className="overflow-hidden border-r">
        <div className="relative aspect-square h-full">
          <Image
            src={imageUrl || "/placeolder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="py-4 flex flex-col justify-between ">
        <div>
          <Link href={productUrl}>
            <p className="font-bold underline">
              {name}
            </p>
          </Link>
          <Link href={tenantUrl}>
            <p className="font-medium underline">
              {tenantName}
            </p>
          </Link>
        </div>
      </div>
      <div className="py-4 flex flex-col justify-between">
        <p className="font-medium">
          {
            formatCurrency(
              price
            )
          }
        </p>
        <button className="underline font-medium cursor-pointer " onClick={onRemove} type="button">Remove</button>

      </div>
    </div>

  )
}
