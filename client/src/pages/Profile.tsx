import { Button } from "@/components/custom/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Edit, Edit3, Github, Loader, Plus, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ChangeDetails from "@/components/profile/ChangeDetails";
import { useState } from "react";
import { uploadFilesToFirebaseAndGetUrl } from "@/utils/file-upload";
import { useUpdateUserProfileMutation } from "@/store/api/authApi";
import { toast } from "@/components/ui/use-toast";
import { setUser } from "@/store/features/userSlice";
import { useGetMyPostsQuery } from "@/store/api/postApi";
import PostItem from "@/components/post/PostItem";
import { Post } from "@/@types/post";
import AddLinks from "@/components/profile/AddLinks";

const Profile = () => {
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const [updateUserProfile, { isLoading: updateProfileLoading }] =
    useUpdateUserProfileMutation();

  const { data, isLoading } = useGetMyPostsQuery({});

  const dispatch = useAppDispatch();

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

  const { userInfo } = useAppSelector((state) => state.auth);
  return (
    <div className="pl-4 pr-4 overflow-y-auto h-viewport-minus-80px">
      <div className="overflow-hidden rounded-lsm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark relative">
        <div className="mt-6.5 absolute top-5 left-5">
          <div className="flex items-center justify-center gap-3.5">
            {userInfo?.github && (
              <Link
                to={userInfo?.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={25} />
              </Link>
            )}
            {userInfo?.twitter && (
              <Link
                to={userInfo?.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={25} />
              </Link>
            )}
          </div>
        </div>
        <Dialog>
          <DialogTrigger>
            <div className="absolute top-4 right-4">
              <Button variant="outline">
                <Edit3 size={20} />
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="p-0">
            <ChangeDetails />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <div className="absolute top-16 right-4">
              <Button variant="outline">
                <Plus size={20} />
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="p-0">
            <AddLinks />
          </DialogContent>
        </Dialog>

        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="flex w-full justify-center items-center mt-5">
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
                    className="h-24 w-24 rounded-full object-cover border"
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
          <div className="mt-4">
            <h3 className="mb-8 text-2xl font-semibold text-black dark:text-white">
              {userInfo?.name}
            </h3>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {isLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    data?.posts?.length
                  )}
                </span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {userInfo?.followersCount}
                </span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {userInfo?.followingCount}
                </span>
                <span className="text-sm">Following</span>
              </div>
            </div>

            <div className="mx-auto max-w-2xl clear-start">
              <h4 className="font-semibold text-black dark:text-white mb-6 mt-4">
                About Me
              </h4>
              <div
                className="mt-4.5 about text-start"
                dangerouslySetInnerHTML={{
                  __html: userInfo?.about || "",
                }}
              ></div>
            </div>

            <div className="w-full mt-10 flex justify-start flex-col gap-2 items-start">
              <h1 className="text-lg font-semibold self-center mb-5">
                Recent Posts
              </h1>
              {data?.posts?.map((post: Post, i: number) => {
                return <PostItem post={post} key={i} />;
              })}
              <div className="h-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
