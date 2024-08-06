import { Github, Loader, Twitter } from "lucide-react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import PostItem from "../components/post/PostItem";

import {
  useFollowUserMutation,
  useGetProfileQuery,
  useIsFollowQuery,
} from "@/store/api/userApi";
import { Button } from "@/components/custom/button";
import { useAppSelector } from "@/store/hooks";
import { useCallback, useRef, useState } from "react";
import useFetchUserPosts from "@/hooks/useFetchUsersPosts";
import { User } from "@/@types/user";
import { RootState } from "@/store/store";

const Profile = () => {
  const { id } = useParams();

  const [page, setPage] = useState(0);

  const {
    loading: isLoading,
    error,
    posts,
    hasMore,
    refetchSinglePost,
  } = useFetchUserPosts(id, page);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const { data, isLoading: isLoadingProfile } = useGetProfileQuery(
    id as string,
    {
      skip: !id,
    }
  );

  const { data: isFollow, refetch } = useIsFollowQuery(id);

  const [followUser, { isLoading: isFollowingLoading }] =
    useFollowUserMutation();

  const followHandler = async () => {
    await followUser(id);
    refetch();
  };

  const observer = useRef<IntersectionObserver | null>(null);

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

  if (isLoadingProfile) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <Loader className="animate-spin h-12 w-12" />
      </div>
    );
  }

  const path = pathname === "/user/profile/" + userInfo?.id;

  if (!id) {
    return null;
  }

  const isFriend = userInfo?.friends.find(
    (fri: User) => fri.id === parseInt(id)
  );

  return (
    <>
      {path ? (
        <Navigate to={"/user/profile"} />
      ) : (
        <div className="lg:pl-4 lg:pr-4 pl-2 pr-2 overflow-y-auto h-viewport-minus-80px">
          <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark relative">
            <div className="mt-6.5 absolute top-5 left-5">
              <div className="flex items-center justify-center gap-3.5">
                {data?.user?.github && (
                  <Link
                    to={data?.user?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={25} />
                  </Link>
                )}
                {data?.user?.twitter && (
                  <Link
                    to={data?.user?.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter size={25} />
                  </Link>
                )}
              </div>
            </div>
            <div className="pb-6 text-center lg:pb-8 xl:pb-11.5">
              <div className="flex w-full justify-center items-center mt-5">
                <div className="relative flex justify-center items-center">
                  <img
                    src={
                      data?.user?.avatar
                        ? data?.user?.avatar
                        : "/user-profile2.jpg"
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

                <div className="flex gap-2 w-full justify-end mb-4 px-2">
                  <Button
                    loading={isFollowingLoading}
                    onClick={() => followHandler()}
                  >
                    {isFollow ? "UnFollow" : "Follow"}
                  </Button>
                  <Button
                    onClick={() => {
                      if (isFriend) {
                        navigate(`/user/chats`);
                      } else {
                        navigate(`/user/chats/new`, {
                          state: {
                            user: data?.user,
                          },
                        });
                      }
                    }}
                  >
                    Chat
                  </Button>
                </div>

                <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                  <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">
                      {data?.totalPosts}
                    </span>
                    <span className="text-sm">Posts</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">
                      {data?.user?.followersCount || 0}
                    </span>
                    <span className="text-sm">Followers</span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">
                      {data?.user?.followingCount || 0}
                    </span>
                    <span className="text-sm">Following</span>
                  </div>
                </div>

                <div className="mx-auto max-w-2xl clear-start px-4">
                  <h4 className="font-semibold text-black dark:text-white mb-6 mt-4">
                    About Me
                  </h4>
                  {data?.user?.about ? (
                    <div
                      className="mt-4.5 about text-start"
                      dangerouslySetInnerHTML={{ __html: data?.user?.about }}
                    ></div>
                  ) : null}
                </div>

                <div className="w-full mt-10 flex justify-start flex-col gap-2 items-start px-2">
                  <h1 className="text-lg font-semibold self-center mb-5">
                    Recent Posts
                  </h1>
                  {posts &&
                    posts?.map((post, i: number) => {
                      const isLastElement = posts.length === i + 1;
                      return isLastElement ? (
                        <>
                          <div key={i} ref={lastElementRef}>
                            <PostItem
                              post={post}
                              key={i}
                              refetchSinglePost={refetchSinglePost}
                            />
                          </div>
                          <div className="h-6"></div>
                        </>
                      ) : (
                        <div key={i}>
                          <PostItem
                            post={post}
                            key={i}
                            refetchSinglePost={refetchSinglePost}
                          />
                        </div>
                      );
                    })}
                  {isLoading ? (
                    <div className="w-full flex justify-center items-center py-12">
                      <Loader className="animate-spin h-8 w-8" />
                    </div>
                  ) : null}
                  <div className="">
                    {error && <p>Error loading posts...</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
