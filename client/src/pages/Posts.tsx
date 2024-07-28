import Post from "@/components/post/Post";
import CreatePost from "@/components/post/CreatePost";
import FriendOfFriend from "@/components/post/FriendOfFriend";
import { useGetFeedPostQuery } from "@/store/api/postApi";
import { Post as IPost } from "@/@types/post";
import { Loader } from "lucide-react";

const Posts = () => {
  const { data, isLoading } = useGetFeedPostQuery({});

  if (isLoading) {
    return (
      <div className="w-full overflow-hidden flex justify-center items-center py-12">
        <Loader className="animate-spin" size={30} />
      </div>
    );
  }

  return (
    <div className="h-viewport-minus-80px w-full flex flex-col items-center pl-4 pr-4">
      <div className="flex gap-4 w-full h-full">
        <div className="sm:w-[60%] bg-slate-50 w-full flex flex-col gap-4 justify-center items-center border pt-4 pb-1 overflow-y-auto h-full ">
          <h1>Your Feed</h1>
          <div className="flex flex-col gap-4 overflow-y-auto border-t border-slate-300 h-full w-full px-4 items-center">
            <div className="h-2"></div>
            {data &&
              data?.posts.map((post: IPost, i: number) => (
                <Post key={i} post={post} />
              ))}
            <div className="h-2"></div>
          </div>
        </div>

        <div className="w-[30%] sm:flex h-fit justify-center hidden mx-auto">
          <div className="flex flex-col gap-2 w-full">
            <CreatePost />
            <h2 className="py-4 text-lg text-center">People You May Know</h2>

            <div className="bg-slate-50">
              <FriendOfFriend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
