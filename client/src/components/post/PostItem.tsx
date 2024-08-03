import { ArrowDown, ArrowUp, Loader, Pin, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Post as IPost } from "../../@types/post";
import {
  useSavePostMutation,
  useUpOrDownVoteMutation,
} from "@/store/api/postApi";
import { toast } from "../ui/use-toast";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { PostSkelton } from "../Skelton/PostSkelton";
import moment from "moment";

const Post = ({
  post,
  refetchSinglePost,
}: {
  post: IPost;
  refetchSinglePost?: (id: number) => Promise<IPost>;
}) => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [vote, setVote] = useState<any>();
  const [postData, setPostData] = useState<IPost>(post);
  const [isSaved, setIsSaved] = useState(false);

  const [upOrDownVote, { isLoading }] = useUpOrDownVoteMutation();

  const [savePost] = useSavePostMutation();

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
    } finally {
      if (refetchSinglePost) {
        const p = await refetchSinglePost(post.id);
        setPostData(p);
      }
    }
  };

  useEffect(() => {
    if (postData) {
      setVote(postData.vote.find((vote) => vote.author_id === userInfo.id));
    }
  }, [postData, userInfo.id]);

  useEffect(() => {
    if (postData?.savedPost) {
      const isSaved = postData?.savedPost?.find(
        (p) => p.author_id === userInfo.id
      );
      setIsSaved(isSaved ? true : false);
    }
  }, [postData, userInfo.id]);

  const onImageLoad = () => {
    setIsImageLoaded(true);
  };

  const savePostHandler = async () => {
    try {
      const data = await savePost({
        id: post.id,
      }).unwrap();
      if (refetchSinglePost) {
        const p = await refetchSinglePost(post.id);
        setPostData(p);
      }
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

  const Vote = ({ type }: { type: "horizontal" | "vertical" }) => {
    return (
      <div
        className={`flex ${
          type === "horizontal" ? "flex-row" : "flex-col"
        }  gap-4`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`border rounded-full border-slate-300 p-2 cursor-pointer ${
              vote?.vote === "up-vote" ? "bg-green-200" : ""
            }`}
            onClick={() => upOrDownVoteHandler("up-vote", post?.id)}
          >
            <ArrowUp size={20} />
          </div>
          <span>
            {isLoading ? (
              <Loader className="animate-spin" size={16} />
            ) : (
              postData?.vote.filter((vote) => vote.vote === "up-vote").length
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`border rounded-full border-slate-300 p-2 cursor-pointer ${
              vote?.vote === "down-vote" ? "bg-red-200" : ""
            }`}
            onClick={() => upOrDownVoteHandler("down-vote", post.id)}
          >
            <ArrowDown size={20} />
          </div>
          <span>
            {isLoading ? (
              <Loader className="animate-spin" size={16} />
            ) : (
              postData?.vote.filter((vote) => vote.vote === "down-vote").length
            )}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="lg:card rounded-xl lg:max-w-lg flex lg:gap-8">
      <div className="lg:flex items-center min-w-[45px] hidden">
        <Vote type="vertical" />
      </div>

      <div className="h-auto lg:min-w-[460px] border border-slate-400 transition ease-in-out cursor-pointer rounded-xl w-full">
        <div className="body">
          <div className="">
            <div
              className="flex items-center py-2 px-2"
              onClick={() => navigate(`/user/profile/${postData?.author.id}`)}
            >
              <img
                className="w-10 h-10 rounded-full object-cover mr-2"
                src={
                  postData?.author?.avatar
                    ? postData?.author?.avatar
                    : "/user-profile2.jpg"
                }
                alt="User avatar"
              />
              <div className="flex flex-col gap-1">
                <p className="text-xs">posted by : {postData?.author?.name}</p>
                <p className="text-[10px]">
                  Created At :{" "}
                  {moment(postData?.created_at).startOf("hour").fromNow()}
                </p>
              </div>
            </div>
            <div>
              {postData?.image ? (
                <div
                  className="p-2"
                  onClick={() => navigate(`/user/posts/${postData?.id}`)}
                >
                  <img
                    className={`w-full object-cover rounded-xl h-full ${
                      isImageLoaded ? "block" : "hidden"
                    }`}
                    src={postData?.image}
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
                  dangerouslySetInnerHTML={{ __html: postData?.text || "" }}
                  onClick={() => navigate(`/user/posts/${postData?.id}`)}
                ></div>
                <div className="footer flex w-full mt-4">
                  <div className="flex space-x-4  w-full justify-between">
                    <div className="flex gap-4">
                      <div
                        className={`flex items-center border border-slate-300 rounded-full py-1 px-3 ${
                          isSaved ? "bg-slate-300" : ""
                        }`}
                        onClick={() => savePostHandler()}
                      >
                        <Pin size={18} />
                        <span className="ml-2">
                          {postData?.savedPost?.length}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Share2 size={18} />
                      </div>
                    </div>

                    <div className="flex items-center min-w-[45px] lg:hidden">
                      <Vote type="horizontal" />
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
