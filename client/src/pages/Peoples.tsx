import FriendOfFriend from "@/components/post/FriendOfFriend";
import SearchBox from "@/components/SearchBox";
import UserSeklton from "@/components/Skelton/UserSeklton";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useFollowUserMutation,
  useGetAllPeoplesQuery,
} from "@/store/api/userApi";
import { truncateText } from "@/utils/helper";
import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";

export interface AllPeople {
  id: number;
  name: string;
  email: string;
  avatar: null | string;
  about: null | string;
  isFollowing: boolean;
}

const dummyData = new Array(9).fill("");

const Peoples = () => {
  const { data, isLoading } = useGetAllPeoplesQuery(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [page, setPage] = useState(0);

  const error = false;
  const hasMore = false;

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <div className="h-screen w-full flex flex-col items-center border border-r-0">
      <div className="flex gap-4 w-full h-full overflow-hidden">
        <div className="sm:w-[90%] overflow-auto">
          <div className="sticky top-0 w-full h-[50px] flex justify-start items-center bg-white bg-opacity-10 backdrop-blur-lg border border-opacity-30 rounded-lg border-slate-600 border-l-0">
            <BackButton showText={false} variant={"link"} />
            <h1>Connect</h1>
          </div>
          <div
            className={cn(
              "flex flex-col overflow-y-auto h-[calu(h-[100vh]-50px)] w-full items-center px-4",
              {
                "px-0 border h-auto border-b-0": isLoading,
              }
            )}
          >
            <div className="h-2"></div>
            {data?.peoples &&
              data.peoples?.map((user, i: number) => {
                const isLastElement = data.peoples.length === i + 1;
                return isLastElement ? (
                  <div key={i} ref={lastElementRef} className="w-full">
                    <UserBlock key={i} user={user} />
                  </div>
                ) : (
                  <div key={i} className="w-full">
                    <UserBlock key={i} user={user} />
                  </div>
                );
              })}

            {isLoading && (
              <div className="overflow-hidden w-full bg-white flex justify-center items-center py-4 flex-col">
                {dummyData.map((item, i) => (
                  <UserSeklton
                    avatarHeight="h-14"
                    avatarWidth="w-14"
                    key={i + item}
                  />
                ))}
              </div>
            )}
            {error && <p>Error loading posts...</p>}
            <div className="h-4"></div>
          </div>
        </div>

        <div className="w-[50%] mt-4 sm:flex h-fit justify-center overflow-hidden hidden mx-auto">
          <div className="flex flex-col gap-2 w-full">
            <div className="mb-4">
              <SearchBox />
            </div>

            <div className="">
              <FriendOfFriend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Peoples;

const UserBlock = ({ user }: { user: AllPeople }) => {
  const [isFollow, setIsFollow] = useState(user.isFollowing);

  const [followUser, { isLoading }] = useFollowUserMutation();

  const followUserHandle = async () => {
    await followUser(user.id);
    setIsFollow(!isFollow);
  };

  return (
    <div className="flex justify-between items-center hover:from-indigo-200 hover:to-indigo-100 hover:text-indigo-800">
      <Link
        to={`/user/profile/${user.id}`}
        className={`flex items-center py-4 px-4"
        `}
      >
        <div className="w-12 h-12 rounded-full mr-4">
          <img
            className="w-full h-full rounded-full object-cover"
            src={user?.avatar ? user.avatar : "/user-profile2.jpg"}
            alt="User avatar"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-md font-medium text-gray-800">
            <span className="hover:underline">
              {truncateText(user.name, 30)}
            </span>
          </h3>
          <p className="text-gray-600 text-sm">
            <span className="">{truncateText(user.email, 30)}</span>
          </p>
        </div>
      </Link>
      <Button
        disabled={isLoading}
        className="rounded-full px-6 py-2 text-xs"
        onClick={followUserHandle}
      >
        {isFollow ? "Follow" : "Following"}
      </Button>
    </div>
  );
};
