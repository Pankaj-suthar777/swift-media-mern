import Post from "@/components/post/PostItem";
import FriendOfFriend from "@/components/post/FriendOfFriend";
import BackButton from "@/components/ui/back-button";
import { Textarea } from "@/components/ui/textarea";
import CommentDiscussion from "@/components/post/CommentDiscussion";
import { useGetSinglePostQuery } from "@/store/api/postApi";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import SinglePost from "@/components/post/SinglePost";

const Posts = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSinglePostQuery(id);

  if (isLoading) {
    return (
      <div className="w-full overflow-hidden flex justify-center items-center py-12">
        <Loader className="animate-spin" size={30} />
      </div>
    );
  }

  return (
    <div className="h-viewport-minus-80px w-full flex flex-col items-center pl-2 pr-2 overflow-x-hidden">
      <div className="flex gap-4 w-full h-full">
        <div className="sm:w-[60%] bg-slate-50 w-full flex flex-col justify-center items-center border overflow-y-auto h-full">
          <div className="w-full flex justify-start py-2 px-2">
            <BackButton />
          </div>
          <div className=" w-full gap-4 overflow-y-auto border-t border-slate-300 h-full px-4 items-center">
            <div className="w-full">
              {/*  ==============================  */}

              <div className="overflow-auto pl-4 pr-4 w-full">
                <SinglePost post={data.post} />

                {/*Comments*/}
                <div className="mt-10 border w-full border-slate-500 p-4">
                  <h1 className="mb-2">Disscussion</h1>
                  <Textarea
                    className="mb-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="add comment..."
                  />
                  <CommentDiscussion />
                </div>
              </div>
              {/*  ==============================  */}
            </div>
          </div>
        </div>

        <div className="w-[30%] sm:flex h-fit justify-center hidden mx-auto">
          <div className="flex flex-col gap-2 w-full">
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
