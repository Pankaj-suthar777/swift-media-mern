import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

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
    cell: ({ row }) => {
      const { id } = row.original;

      return <CellAction id={id} />;
    },
  },
];
