import { User } from "@/@types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export function RecentFollowers({
  followers,
  isLoading,
}: {
  followers: User[] | undefined;
  isLoading: boolean;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Recent Followers</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 mt-2 p-0 min-h-[295px]">
        {isLoading === false && followers === undefined && (
          <div className="flex justify-center items-center">
            No one follow you yet.
          </div>
        )}
        {followers?.map((user, i) => (
          <Link
            to={`/user/profile/${user.id}`}
            key={i}
            className={`flex items-center py-4 px-4 hover:bg-gradient-to-tr hover:from-indigo-200 hover:to-indigo-100 hover:text-indigo-800"
          `}
          >
            <div className="w-10 h-10 rounded-full mr-4">
              <img
                className="w-full h-full rounded-full object-cover"
                src={user?.avatar ? user.avatar : "/user-profile2.jpg"}
                alt="User avatar"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium te{xt-gray-800">
                <span className="">{user.name}</span>
              </h3>
              <p className="text-gray-600 text-xs">
                <span className="">{user.email}</span>
              </p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
