import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

export type UserColumn = {
  id: number;
  name: string;
  avatar: string;
  email: string;
  followersCount: number;
  followingCount: number;
  posts: number;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "avatar",
    header: "Profile",
    cell: ({ row }) => {
      const { avatar, name } = row.original;
      return (
        <Avatar>
          <AvatarImage
            className="object-cover"
            src={avatar ? avatar : "/user-profile2.jpg"}
          />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "followersCount",
    header: "Followers",
  },
  {
    accessorKey: "followingCount",
    header: "Following",
  },
  {
    accessorKey: "posts",
    header: "Posts",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      // const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {}}>Delete</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
