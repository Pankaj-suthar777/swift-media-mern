import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function PostSkelton({
  posterHeight = "h-[155px]",
  skeltonColorClass,
  skeltonLinkHeight,
}: {
  posterHeight?: string;
  skeltonColorClass?: string;
  skeltonLinkHeight?: string;
}) {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton
        className={cn("w-full rounded-xl", posterHeight, skeltonColorClass)}
      />
      <div className="space-y-2">
        <Skeleton
          className={cn("h-4 w-full", skeltonColorClass, skeltonLinkHeight)}
        />
        <Skeleton
          className={cn("h-4 w-full", skeltonColorClass, skeltonLinkHeight)}
        />
      </div>
    </div>
  );
}
