import { Facebook, Github, Loader, Twitter } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  useFollowUserMutation,
  useGetProfileQuery,
  useIsFollowQuery,
} from "@/store/api/userApi";
import { Button } from "@/components/custom/button";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetProfileQuery(id as string, {
    skip: !id,
  });

  const { data: isFollow, refetch } = useIsFollowQuery(id);

  const [followUser] = useFollowUserMutation();

  const followHandler = async () => {
    await followUser(id);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <Loader className="animate-spin h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="pl-4 pr-4">
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark relative">
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="flex w-full justify-center items-center mt-5">
            <div className="relative flex justify-center items-center">
              <img
                src={
                  data?.user?.avatar ? data?.user?.avatar : "/user-profile2.jpg"
                }
                className="h-24 w-24 rounded-full object-cover border"
                alt="profile"
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-4 text-2xl font-semibold text-black dark:text-white">
              {data?.user?.name}
            </h3>

            <div className="flex gap-2 w-full justify-end mb-4">
              <Button onClick={() => followHandler()}>
                {isFollow ? "UnFollow" : "Follow"}
              </Button>
              <Button
                onClick={() =>
                  navigate(`/user/chats/new`, {
                    state: {
                      user: data?.user,
                    },
                  })
                }
              >
                Chat
              </Button>
            </div>

            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  259
                </span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {data?.user?.followersCount}
                </span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {data?.user?.followingCount}
                </span>
                <span className="text-sm">Following</span>
              </div>
            </div>

            <div className="mx-auto max-w-2xl clear-start">
              <h4 className="font-semibold text-black dark:text-white mb-6 mt-4">
                About Me
              </h4>
              {data?.user?.about ? (
                <div
                  className="mt-4.5 about"
                  dangerouslySetInnerHTML={{ __html: data?.user?.about }}
                ></div>
              ) : null}
            </div>

            <div className="mt-6.5">
              <h4 className="mb-3.5 font-medium text-black dark:text-white">
                Follow me on
              </h4>
              <div className="flex items-center justify-center gap-3.5">
                <Link to={"#"}>
                  <Github size={25} />
                </Link>
                <Link to={"#"}>
                  <Twitter size={25} />
                </Link>
                <Link to={"#"}>
                  <Facebook size={25} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
