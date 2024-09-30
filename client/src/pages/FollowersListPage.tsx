import { User } from "@/@types/user";
import FriendOfFriend from "@/components/post/FriendOfFriend";
import SearchBox from "@/components/SearchBox";
import UserSeklton from "@/components/Skelton/UserSeklton";
import BackButton from "@/components/ui/back-button";
import { cn } from "@/lib/utils";
import { useGetUserFollowersListQuery } from "@/store/api/userApi";
import { Link, useParams } from "react-router-dom";
const dummyData = new Array(6).fill("");

const FollowersListPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUserFollowersListQuery(id);
  return (
    <div className="h-screen w-full flex flex-col items-center border border-r-0">
      <div className="flex gap-4 w-full h-full overflow-hidden">
        <div className="md:w-[90%] w-[100%] overflow-auto">
          <div className="sticky top-0 w-full h-[50px] flex justify-start items-center bg-white bg-opacity-10 backdrop-blur-lg border border-opacity-30 rounded-lg border-slate-600 border-l-0">
            <BackButton showText={false} variant={"link"} />
            <h1>Followers</h1>
          </div>
          <div
            className={cn(
              "flex flex-col overflow-y-auto h-[calu(100vh-50px)] md:w-full items-center w-[calu(100vw-60px)]",
              {
                "border h-auto border-b-0": isLoading,
              }
            )}
          >
            {data?.followers?.length === 0 && (
              <div className="flex justify-center">
                <h1>No one follow yet.</h1>
              </div>
            )}
            <div className="bg-white w-full">
              {isLoading
                ? dummyData.map((item, i) => <UserSeklton key={i + item} />)
                : data?.followers?.map((user: User, i: number) => (
                    <Link
                      to={`/user/profile/${user.id}`}
                      key={i}
                      className={`flex items-center py-4 px-6 hover:bg-gradient-to-tr hover:from-indigo-200 hover:to-indigo-100 hover:text-indigo-800 w-full`}
                    >
                      <div className="w-10 h-10 rounded-full mr-4">
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src={
                            user?.avatar ? user.avatar : "/user-profile2.jpg"
                          }
                          alt="User avatar"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-800">
                          <span>{user.name}</span>
                        </h3>
                        <p className="text-gray-600 text-xs">
                          <span>{user.email}</span>
                        </p>
                      </div>
                    </Link>
                  ))}
            </div>
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

export default FollowersListPage;
