import FriendOfFriend from "@/components/post/FriendOfFriend";
import BackButton from "@/components/ui/back-button";
import { Textarea } from "@/components/ui/textarea";
import CommentDiscussion from "@/components/post/CommentDiscussion";
import {
  useAddCommentMutation,
  useGetSinglePostQuery,
} from "@/store/api/postApi";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import SinglePost from "@/components/post/SinglePost";
import { Button } from "@/components/custom/button";
import { FormEvent, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Comment } from "@/@types/comment";

const Posts = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetSinglePostQuery(id);
  const [text, setText] = useState("");
  const [commentReplay, setCommentReplay] = useState<Comment | null>(null);

  const [addComment, { isLoading: isCommentAdding }] = useAddCommentMutation();

  const submitCommitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text?.trim() === "") {
      return;
    }
    try {
      const { data } = await addComment({ id, text });
      toast({
        title: data?.message,
        variant: "default",
      });

      setText("");
    } catch (error: any) {
      toast({
        title: error?.data?.error,
        variant: "default",
      });
    }
  };

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
            <BackButton to="/user/posts" />
          </div>
          <div className=" w-full gap-4 overflow-y-auto border-t border-slate-300 h-full px-4 items-center">
            <div className="w-full">
              {/*  ==============================  */}

              <div className="overflow-auto pl-4 pr-4 w-full">
                <SinglePost post={data.post} refetchPost={refetch} />

                {/*Comments*/}
                <div className="mt-10 border w-full border-slate-500 p-4">
                  <form
                    onSubmit={submitCommitHandler}
                    className="flex flex-col"
                  >
                    <h1 className="mb-2">Disscussion</h1>
                    <div className="relative">
                      <Textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="mb-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="add comment..."
                      />
                    </div>
                    <Button loading={isCommentAdding} className="self-end ">
                      Submit
                    </Button>
                  </form>
                  <CommentDiscussion
                    commentReplay={commentReplay}
                    setCommentReplay={setCommentReplay}
                  />
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
