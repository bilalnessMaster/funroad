import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

const MAX_RATING = 5;
const MIN_RATING = 0


interface StartRatingProps {
  rating: number;
  className?: string;
  iconClassName?: string;
  text?: string


}


const StarRating = ({ rating, className, iconClassName, text }: StartRatingProps) => {
  const safeRatin = Math.max(MIN_RATING, Math.min(rating, MAX_RATING))
  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      {
        Array.from({ length: MAX_RATING }, (_, index) => (
          <StarIcon
            key={index}
            className={cn("size-4",
              index < safeRatin ? "fill-black" : "",
              iconClassName
            )} />
        )
        )
      }

    </div>
  )
}


export default StarRating;
