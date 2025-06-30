import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { useState } from "react";



interface Props {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export const StarPicker = ({ value, onChange, disabled, className }: Props) => {
  const [hoverValue, setHoverValue] = useState(0)

  return (
    <div className={cn("flex gap-x-2 items-center", { "opacity-50 cursor-not-allowed": disabled }, className)}>
      {
        [1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={false}
            className={cn("p-0.5 hover:scale-110 transition", { "cursor-pointer": !disabled })}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(0)}
          >
            <StarIcon className={cn("size-5",

              (value || hoverValue) >= star ?
                "fill-black stroke-black" :
                "stroke-black "
            )} />
          </button>
        ))
      }

    </div>
  )
}
