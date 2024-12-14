import { Github, LinkIcon, Loader, Mail, Twitter, X } from "lucide-react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  useFollowUserMutation,
  useGetProfileQuery,
  useIsFollowQuery,
} from "@/store/api/userApi";
import { Button } from "@/components/custom/button";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { TooltipComponent } from "@/components/TooltipComponent";
import { useGetOtherUserAndMyChatQuery } from "@/store/api/chatApi";
import SearchBox from "@/components/SearchBox";
import FriendOfFriend from "@/components/post/FriendOfFriend";
import BackButton from "@/components/ui/back-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostsTab from "@/components/profile/PostsTab";
import AboutTab from "@/components/profile/AboutTab";
import { useState } from "react";
import { motion } from "framer-motion";

const Profile = () => {
  const { id } = useParams();

  const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading: isLoadingProfile } = useGetProfileQuery(
    id as string,
    {
      skip: !id,
    }
  );
  const { data: chat_data } = useGetOtherUserAndMyChatQuery({
    other_user_id: id,
  });
  const { data: isFollow, refetch } = useIsFollowQuery(id);

  const [followUser, { isLoading: isFollowingLoading }] =
    useFollowUserMutation();

  const followHandler = async () => {
    await followUser(id);
    refetch();
  };

  const path = pathname === "/user/profile/" + userInfo?.id;

  if (!id) {
    return null;
  }

  return (
    <>
      {path ? (
        <Navigate to={"/user/profile"} />
      ) : (
        <div className="h-screen w-full flex flex-col items-center border border-r-0">
          <div className="flex gap-4 w-full h-full overflow-hidden">
            <div className="sm:w-[90%] overflow-auto">
              <div className="sticky top-0 w-full h-[50px] flex flex-col gap-4 justify-center items-start bg-white bg-opacity-10 backdrop-blur-lg border-b border-opacity-30 rounded-lg z-20">
                <div className="flex items-center">
                  <BackButton
                    className="bg-transparent"
                    variant={"link"}
                    showText={false}
                  />
                  {data?.totalPosts && (
                    <div className="flex flex-col">
                      <span className="text-md font-semibold">
                        {data?.user?.name}
                      </span>
                      <span className="text-xs">{data?.totalPosts} posts</span>
                    </div>
                  )}
                </div>
              </div>
              {isLoadingProfile && (
                <div className="w-full flex justify-center items-center py-12">
                  <Loader className="animate-spin h-8 w-8" />
                </div>
              )}
              {!isLoadingProfile && (
                <div className="flex flex-col gap-4 overflow-y-auto h-[calu(h-[100vh]-50px)] md:w-full items-center  w-[calc(100vw-60px)]">
                  <div className="overflow-hidden rounded-sm border border-stroke border-b-0 shadow-default dark:border-strokedark dark:bg-boxdark relative w-full">
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

                    <div className="pb-6 lg:pb-8 xl:pb-11.5 relative">
                      <div
                        style={{
                          backgroundImage: `url(${
                            data?.user?.backgroundImage ||
                            "https://www.lightstalking.com/wp-content/uploads/backlit-beach-color-258109-3-1024x576.jpg"
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        className="h-48 w-full"
                      ></div>
                      {/* <div
                        className={`bg-[url('https://www.lightstalking.com/wp-content/uploads/backlit-beach-color-258109-3-1024x576.jpg')] bg-cover bg-center h-48`}
                      ></div> */}
                      <div className="flex justify-between">
                        <div className="flex w-full justify-start items-center pt-5 absolute md:top-[110px] top-[120px] left-4">
                          <div
                            className="relative flex justify-center items-center cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                          >
                            <img
                              src={
                                data?.user?.avatar
                                  ? data?.user?.avatar
                                  : "/user-profile2.jpg"
                              }
                              className="md:h-32 md:w-32 h-28 w-28 rounded-full object-cover border"
                              alt="profile"
                            />
                          </div>
                        </div>
                        <div className="mt-16 w-full">
                          <p className="mt-4 md:text-2xl text-xl font-semibold text-black dark:text-white px-4">
                            {data?.user?.name}
                          </p>
                          <p className="font-normal text-sm text-black dark:text-white px-4">
                            {data?.user?.email}
                          </p>
                          <div className="px-4 text-xs underline mt-4 w-full">
                            {data?.user?.github && (
                              <p className="flex gap-2 items-center">
                                <LinkIcon size={14} />
                                <a href={data?.user?.github} target="_blank">
                                  Github Profile
                                </a>
                              </p>
                            )}
                            {data?.user?.twitter && (
                              <p className="flex gap-2 items-center">
                                <LinkIcon size={14} />

                                <a href={data?.user?.twitter} target="_blank">
                                  Twitter Profile
                                </a>
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 w-full justify-end mt-2 px-2 z-10">
                          <div className="flex md:flex-row flex-col items-center h-fit gap-2">
                            <Button
                              className="flex gap-2 rounded-full"
                              onClick={() => {
                                if (chat_data?.id) {
                                  navigate(`/user/chats/${chat_data.id}`, {
                                    state: {
                                      user: data?.user,
                                    },
                                  });
                                } else {
                                  navigate(`/user/chats/new`, {
                                    state: {
                                      user: data?.user,
                                    },
                                  });
                                }
                              }}
                            >
                              <Mail size={16} /> Message
                            </Button>
                            <Button
                              loading={isFollowingLoading}
                              onClick={() => followHandler()}
                              className="rounded-full px-6"
                            >
                              {isFollow ? "following" : "follow"}
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="mx-auto mt-6 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                        <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                          <span className="font-semibold text-black dark:text-white">
                            {data?.totalPosts}
                          </span>
                          <span className="text-sm">Posts</span>
                        </div>
                        <TooltipComponent
                          Content={<h1>Tap to see followers list</h1>}
                        >
                          <div
                            className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row cursor-pointer"
                            onClick={() =>
                              navigate(`/user/profile/${id}/followers`)
                            }
                          >
                            <span className="font-semibold text-black dark:text-white">
                              {data?.user?.followersCount || 0}
                            </span>
                            <span className="text-sm">Followers</span>
                          </div>
                        </TooltipComponent>
                        <TooltipComponent
                          Content={<h1>Tap to see following list</h1>}
                        >
                          <div
                            className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row cursor-pointer"
                            onClick={() =>
                              navigate(`/user/profile/${id}/following`)
                            }
                          >
                            <span className="font-semibold text-black dark:text-white">
                              {data?.user?.followingCount || 0}
                            </span>
                            <span className="text-sm">Following</span>
                          </div>
                        </TooltipComponent>
                      </div>

                      <Tabs defaultValue="posts" className="w-full">
                        <TabsList className="w-full p-0 h-fit">
                          <TabsTrigger value="posts" className="w-full">
                            Posts
                          </TabsTrigger>
                          <TabsTrigger value="about" className="w-full">
                            About
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="about" className="w-full">
                          <AboutTab about={data.user?.about} />
                        </TabsContent>
                        <TabsContent value="posts" className="w-full">
                          <PostsTab />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-[50%] mt-4 md:flex h-fit justify-center overflow-hidden hidden mx-auto">
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

          {isModalOpen && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setIsModalOpen(false)}
              ></div>

              <motion.div
                className="fixed inset-0 flex justify-center items-center z-50"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalContentVariants}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  className="relative bg-white rounded-lg overflow-hidden"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    className="absolute top-2 right-2 text-black bg-gray-100 rounded-full p-2 z-10"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <X />
                  </button>
                  <img
                    src={
                      data?.user?.avatar
                        ? data?.user?.avatar
                        : "/user-profile2.jpg"
                    }
                    className="max-w-[90vw] max-h-[90vh] object-cover"
                    alt="profile enlarged"
                  />
                </motion.div>
              </motion.div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
