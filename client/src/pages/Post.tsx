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
import { PostSkelton } from "@/components/Skelton/PostSkelton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import SearchBox from "@/components/SearchBox";

const Posts = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetSinglePostQuery(id);

  const [text, setText] = useState("");
  const [commentReplay, setCommentReplay] = useState<Comment | null>(null);

  const [addComment, { isLoading: isCommentAdding }] = useAddCommentMutation();
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

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

  return (
    <div className="h-screen w-full flex flex-col items-center overflow-x-hidden">
      <div className="flex gap-4 w-full h-full">
        <div className="sm:w-[65%] w-full flex flex-col justify-center items-center border overflow-y-auto h-full">
          <div className="w-full flex justify-start py-2 px-2">
            <BackButton to="/user/posts" variant="link" />
          </div>
          <div className="w-full gap-4 overflow-y-auto border-t border-slate-300 h-full items-center">
            <div className="w-full">
              <div className="overflow-auto w-full">
                {isLoading ? (
                  <div className="p-8">
                    <PostSkelton
                      skeltonColorClass={"bg-white"}
                      posterHeight="h-[250px]"
                      skeltonLinkHeight="h-[30px]"
                    />
                  </div>
                ) : (
                  <SinglePost post={data.post} refetchPost={refetch} />
                )}
                {/*Comments*/}
                <div className="mt-10 w-full px-4">
                  <form
                    onSubmit={submitCommitHandler}
                    className="flex flex-col"
                  >
                    <h1 className="mb-2">Disscussion</h1>
                    <div className="relative flex gap-4 items-center">
                      <Avatar>
                        <AvatarImage src={userInfo?.avatar} alt="@shadcn" />
                        <AvatarFallback>{userInfo?.name}</AvatarFallback>
                      </Avatar>
                      <Textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 w-full mb-2"
                        placeholder="add comment..."
                      />
                    </div>
                    {text === "" ? null : (
                      <div className="w-full justify-between flex">
                        <span className="">
                          Replay to @{data?.post?.author?.name}
                        </span>
                        <Button loading={isCommentAdding} className="self-end ">
                          Submit
                        </Button>
                      </div>
                    )}
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

        <div className="w-[40%] sm:flex h-fit justify-center hidden mx-auto">
          <div className="flex flex-col gap-2 w-full">
            <div className="my-4">
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

export default Posts;
