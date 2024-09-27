import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface UserSkeletonProps {
  avatarHeight?: string;
  avatarWidth?: string;
}

function UserSkeleton({
  avatarHeight = "h-12",
  avatarWidth = "w-12",
}: UserSkeletonProps) {
  return (
    <div className="flex items-center space-x-4 p-2 w-full">
      <Skeleton className={cn("rounded-full", avatarWidth, avatarHeight)} />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default UserSkeleton;
