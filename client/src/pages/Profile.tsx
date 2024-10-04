import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Edit, Edit3, Loader, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { uploadFilesToFirebaseAndGetUrl } from "@/utils/file-upload";
import { useUpdateUserProfileMutation } from "@/store/api/authApi";
import { toast } from "@/components/ui/use-toast";
import { setUser } from "@/store/features/userSlice";
import { TooltipComponent } from "@/components/TooltipComponent";
import SearchBox from "@/components/SearchBox";
import FriendOfFriend from "@/components/post/FriendOfFriend";
import BackButton from "@/components/ui/back-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/store/store";
import AboutTab from "@/components/profile/AboutTab";
import PostsTab from "@/components/profile/PostsTab";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ChangeDetails from "@/components/profile/ChangeDetails";
import { Button } from "@/components/custom/button";
import AddLinks from "@/components/profile/AddLinks";

const Profile = () => {
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [updateUserProfile, { isLoading: updateProfileLoading }] =
    useUpdateUserProfileMutation();

  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [totalPosts, setTotalPosts] = useState<null | number>(null);

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) {
      return;
    }
    setFileUploadLoading(true);
    try {
      const url = await uploadFilesToFirebaseAndGetUrl(
        e.target.files?.[0],
        "avatar"
      );

      const body = { avatar: url };

      const data = await updateUserProfile(body).unwrap();

      dispatch(setUser(data?.user));

      toast({
        title: data?.message,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "avatar upload failed",
        description: error.data.error,
        variant: "destructive",
      });
    } finally {
      setFileUploadLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto h-screen">
      <div className="flex gap-4 w-full h-full overflow-hidden relative">
        <div className="sm:w-[90%] overflow-auto">
          <div className="sticky top-0 w-full h-[50px] flex flex-col gap-4 justify-center items-start bg-white bg-opacity-10 backdrop-blur-lg border border-opacity-30 rounded-lg z-20">
            <div className="flex items-center">
              <BackButton
                className="bg-transparent"
                variant={"link"}
                showText={false}
              />

              <div className="flex flex-col">
                <span className="text-md font-semibold">{userInfo?.name}</span>
                <span className="text-xs">{totalPosts} posts</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto h-[calu(h-[100vh]-50px)] md:w-full items-center w-[calc(100vw-60px)]">
            <div className="overflow-hidden rounded-sm border border-stroke border-b-0 shadow-default dark:border-strokedark dark:bg-boxdark relative w-full">
              <div className="pb-6 lg:pb-8 xl:pb-11.5 relative">
                <img
                  src={
                    userInfo?.backgroundImage
                      ? userInfo?.backgroundImage
                      : "https://www.lightstalking.com/wp-content/uploads/backlit-beach-color-258109-3-1024x576.jpg"
                  }
                  alt="Background"
                  className="object-cover w-full h-48"
                />

                <div className="flex justify-between">
                  <div className="flex w-full justify-start items-center pt-5 absolute top-[110px] left-4">
                    <div className="relative flex justify-center items-center">
                      {fileUploadLoading || updateProfileLoading ? (
                        <div className="h-24 w-24 rounded-full border flex justify-center items-center">
                          <Loader className="animate-spin w-8 h-8" />
                        </div>
                      ) : (
                        <>
                          <img
                            src={
                              userInfo?.avatar
                                ? userInfo?.avatar
                                : "https://github.com/shadcn.png"
                            }
                            className="h-32 w-32 rounded-full object-cover border"
                            alt="profile"
                          />
                          <div className="absolute right-2 bottom-2">
                            <label htmlFor="avatar" className="cursor-pointer">
                              <Edit
                                size={20}
                                color="white"
                                className="bg-black rounded-lg"
                              />
                            </label>
                            <input
                              className="hidden"
                              type="file"
                              id="avatar"
                              onChange={(e) => uploadAvatar(e)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-16">
                    <p className="mt-4 text-2xl font-semibold text-black dark:text-white px-4">
                      {userInfo?.name}
                    </p>
                    <p className="font-normal text-sm text-black dark:text-white px-4">
                      {userInfo?.email}
                    </p>
                  </div>
                  <div className="z-10 m-2 flex gap-2 md:flex-row flex-col">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          className="rounded-full px-4 flex gap-2"
                        >
                          <Edit3 size={20} />
                          <span className="text-xs"> Edit Profile</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="p-0">
                        <ChangeDetails />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          className="rounded-full px-4 flex gap-2"
                        >
                          <Plus size={20} />
                          <span className="text-xs"> Add Links</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="p-0">
                        <AddLinks />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="mx-auto mt-6 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
                  <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                    <span className="font-semibold text-black dark:text-white">
                      {!totalPosts ? (
                        <Loader className="animate-spin" />
                      ) : (
                        <div className="flex flex-col justify-center items-center gap-1">
                          {totalPosts}
                          <span className="text-sm font-normal">Posts</span>
                        </div>
                      )}
                    </span>
                  </div>
                  <TooltipComponent
                    Content={<h1>Tap to see followers list</h1>}
                  >
                    <div
                      className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row cursor-pointer"
                      onClick={() =>
                        navigate(`/user/profile/${userInfo?.id}/followers`)
                      }
                    >
                      <span className="font-semibold text-black dark:text-white">
                        {userInfo?.followersCount || 0}
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
                        navigate(`/user/profile/${userInfo?.id}/following`)
                      }
                    >
                      <span className="font-semibold text-black dark:text-white">
                        {userInfo?.followingCount || 0}
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
                    <AboutTab about={userInfo?.about || ""} />
                  </TabsContent>
                  <TabsContent value="posts" className="w-full">
                    <PostsTab
                      userId={userInfo?.id}
                      setTotalPosts={setTotalPosts}
                    />
                  </TabsContent>
                </Tabs>
              </div>
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

export default Profile;
