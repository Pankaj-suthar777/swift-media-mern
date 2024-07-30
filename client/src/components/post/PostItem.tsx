import { ArrowDown, ArrowUp, Loader, Pin, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Post as IPost } from "../../@types/post";
import { useUpOrDownVoteMutation } from "@/store/api/postApi";
import { toast } from "../ui/use-toast";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { PostSkelton } from "../Skelton/PostSkelton";
import moment from "moment";

const Post = ({ post }: { post: IPost }) => {
  const navigate = useNavigate();
  const [upOrDownVote, { isLoading }] = useUpOrDownVoteMutation();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const upOrDownVoteHandler = async (
    vote: "up-vote" | "down-vote",
    id: number
  ) => {
    if (!id) return;

    try {
      const data = await upOrDownVote({
        vote,
        id: String(id),
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

  const vote = post.vote.find((vote) => vote.author_id === userInfo.id);

  const onImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="card rounded-xl max-w-lg flex gap-8">
      <div className="flex items-center">
        <div className="flex gap-4 flex-col w-full">
          <div className="flex items-center gap-2">
            <div
              className={`border rounded-full border-slate-300 p-2 cursor-pointer ${
                vote?.vote === "up-vote" ? "bg-green-200" : ""
              }`}
              onClick={() => upOrDownVoteHandler("up-vote", post.id)}
            >
              {isLoading ? (
                <Loader className="animate-spin" size={20} />
              ) : (
                <ArrowUp size={20} />
              )}
            </div>
            <span>
              {post.vote.filter((vote) => vote.vote === "up-vote").length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`border rounded-full border-slate-300 p-2 cursor-pointer ${
                vote?.vote === "down-vote" ? "bg-green-200" : ""
              }`}
              onClick={() => upOrDownVoteHandler("down-vote", post.id)}
            >
              {isLoading ? (
                <Loader className="animate-spin" size={20} />
              ) : (
                <ArrowDown size={20} />
              )}
            </div>
            <span>
              {post.vote.filter((vote) => vote.vote === "down-vote").length}
            </span>
          </div>
        </div>
      </div>

      <div className="h-auto min-w-[460px] border border-slate-400 transition ease-in-out cursor-pointer rounded-xl">
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
              <div className="flex flex-col">
                <p className="text-xs">Posted by : {post?.author?.name}</p>
                <p className="text-xs">
                  Created At :{" "}
                  {moment(post?.created_at).startOf("hour").fromNow()}
                </p>
              </div>
            </div>
            <div onClick={() => navigate(`/user/posts/${post.id}`)}>
              {post?.image ? (
                <div className="p-2">
                  <img
                    className={`w-full object-cover rounded-xl h-full ${
                      isImageLoaded ? "block" : "hidden"
                    }`}
                    src={post?.image}
                    onLoad={onImageLoad}
                  />
                </div>
              ) : null}

              {post?.image ? (
                <div className={`${!isImageLoaded ? "block" : "hidden"}`}>
                  <PostSkelton />
                </div>
              ) : null}

              <div className=" px-3 pb-3 pt-1 rounded-xl">
                <div
                  className="text-black whitespace-pre-line break-words text-start"
                  dangerouslySetInnerHTML={{ __html: post.text }}
                ></div>
                <div className="footer flex justify-between mt-4">
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <Pin size={18} />
                      <span className="ml-2">
                        {
                          post.vote.filter((vote) => vote.vote === "up-vote")
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Share2 size={18} />
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

export default Post;
