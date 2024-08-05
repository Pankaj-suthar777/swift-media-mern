import { ArrowDown, ArrowUp, Loader, Pin, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Post as IPost } from "../../@types/post";
import {
  useIsPostSavedQuery,
  useSavePostMutation,
  useUpOrDownVoteMutation,
} from "@/store/api/postApi";
import { toast } from "../ui/use-toast";
import { useAppSelector } from "@/store/hooks";

const SinglePost = ({
  post,
  refetchPost,
}: {
  post: IPost;
  refetchPost: () => void;
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [upOrDownVote, { isLoading }] = useUpOrDownVoteMutation();
  const { userInfo } = useAppSelector((state) => state.auth);

  const [savePost] = useSavePostMutation();
  const { data, refetch } = useIsPostSavedQuery(id);

  const upOrDownVoteHandler = async (vote: "up-vote" | "down-vote") => {
    if (!id) return;

    try {
      const data = await upOrDownVote({
        vote,
        id,
      }).unwrap();

      toast({
        title: data?.message,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: error?.data?.error,
        variant: "destructive",
      });
    }
  };

  const savePostHandler = async () => {
    try {
      const data = await savePost({
        id,
      }).unwrap();
      refetch();
      refetchPost();
      toast({
        title: data?.message,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: error?.data?.error,
        variant: "destructive",
      });
    }
  };

  const vote = post.vote.find((vote) => vote.author_id === userInfo.id);

  return (
    <div className="flex gap-8">
      <div className="h-auto w-full transition ease-in-out cursor-pointer rounded-xl">
        <div className="body">
          <div className="">
            <div
              className="flex items-center py-2 px-2"
              onClick={() => navigate(`/user/profile/${post.author.id}`)}
            >
              <img
                className="w-10 h-10 rounded-full object-cover mr-2"
                src={
                  post?.author?.avatar
                    ? post?.author?.avatar
                    : "/user-profile2.jpg"
                }
                alt="User avatar"
              />
              <p className="text-xs">Posted by : {post?.author?.name}</p>
            </div>
            <div onClick={() => navigate(`/user/posts/${post.id}`)}>
              <div className="p-2">
                {post?.image ? (
                  <img
                    className="w-full object-scale-down rounded-xl h-full max-h-[300px]"
                    src={post?.image}
                  />
                ) : null}
              </div>

              <div className=" px-3 py-3 rounded-xl">
                <div
                  className="text-black whitespace-pre-line break-words"
                  dangerouslySetInnerHTML={{ __html: post.text }}
                ></div>

                <div className="footer flex justify-between mt-4">
                  <div className="flex space-x-4">
                    <div
                      className={`flex items-center border border-slate-300 rounded-full py-1 px-3 hover:bg-slate-200 ${
                        data?.isSaved ? "bg-slate-300" : ""
                      }`}
                      onClick={() => savePostHandler()}
                    >
                      <Pin size={18} />
                      <span className="ml-2">{post.savedPost.length}</span>
                    </div>
                    <div className="flex items-center">
                      <Share2 size={18} />
                      <span className="ml-2">
                        {
                          post.vote.filter((vote) => vote.vote === "down-vote")
                            .length
                        }
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`border rounded-full border-slate-300 p-2 cursor-pointer ${
                          vote?.vote === "up-vote" ? "bg-green-200" : ""
                        }`}
                        onClick={() => upOrDownVoteHandler("up-vote")}
                      >
                        {isLoading ? (
                          <Loader className="animate-spin" size={20} />
                        ) : (
                          <ArrowUp size={20} />
                        )}
                      </div>
                      <span>
                        {
                          post.vote.filter((vote) => vote.vote === "up-vote")
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`border rounded-full border-slate-300 p-2 cursor-pointer ${
                          vote?.vote === "down-vote" ? "bg-red-200" : ""
                        }`}
                        onClick={() => upOrDownVoteHandler("down-vote")}
                      >
                        {isLoading ? (
                          <Loader className="animate-spin" size={20} />
                        ) : (
                          <ArrowDown size={20} />
                        )}
                      </div>
                      <span>
                        {
                          post.vote.filter((vote) => vote.vote === "down-vote")
                            .length
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
