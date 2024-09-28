import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function PostSkelton({
  posterHeight = "h-[155px]",
}: {
  posterHeight: string;
}) {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton className={cn("w-full rounded-xl", posterHeight)} />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
