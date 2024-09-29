import {
  ArrowDown,
  ArrowUp,
  Loader,
  MoreHorizontal,
  Pin,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Post as IPost } from "../../@types/post";
import {
  useDeletePostMutation,
  useSavePostMutation,
  useUpOrDownVoteMutation,
} from "@/store/api/postApi";
import { toast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { PostSkelton } from "../Skelton/PostSkelton";
import moment from "moment";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import UpdatePostModal from "./UpdatePostModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../custom/button";
import ShareLink from "../layout/ShareLink";

interface SidePostProps {
  type: "horizontal" | "vertical";
}

const Post = ({
  removeDeletedPost,
  post,
  refetchSinglePost,
  isEditable = false,
}: {
  post: IPost;
  isEditable?: boolean;
  removeDeletedPost?: (id: number) => void;
  refetchSinglePost?: (id: number) => Promise<IPost>;
}) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [vote, setVote] = useState<any>();
  const [postData, setPostData] = useState<IPost | null>(post);
  const [isSaved, setIsSaved] = useState(false);

  const [upOrDownVote] = useUpOrDownVoteMutation();

  const [savePost, { isLoading }] = useSavePostMutation();

  const upOrDownVoteHandler = async (
    vote: "up-vote" | "down-vote",
    id: number
  ) => {
    if (!id) return;

    try {
      const existingVoteIndex = post.vote.findIndex(
        (v) => v.author_id === userInfo?.id
      );

      let updatedVotes;

      if (existingVoteIndex !== -1) {
        // If the user already voted update vote
        updatedVotes = post.vote.map((v, index) =>
          index === existingVoteIndex ? { ...v, vote } : v
        );
      } else {
        // If the user hasn't voted
        updatedVotes = [
          ...post.vote,
          {
            vote,
            author_id: userInfo?.id as number,
            created_at: new Date(),
            post_id: postData?.id as number,
            id: Math.floor(Math.random() * 1000),
          },
        ];
      }

      setPostData({
        ...post,
        vote: updatedVotes,
      });

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

  useEffect(() => {
    if (postData) {
      setVote(postData.vote.find((vote) => vote.author_id === userInfo?.id));
    }
  }, [postData, userInfo?.id]);

  useEffect(() => {
    if (postData?.savedPost) {
      const isSaved = postData?.savedPost?.find(
        (p) => p.author_id === userInfo?.id
      );
      setIsSaved(isSaved ? true : false);
    }
  }, [postData, userInfo?.id]);

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

  const [deletePost] = useDeletePostMutation();

  const deleteHandler = async (id: number) => {
    try {
      const data = await deletePost(id).unwrap();
      toast({
        title: data?.message,
        variant: "default",
      });
      if (removeDeletedPost) {
        removeDeletedPost(id);
      }
      setPostData(null);
    } catch (error: any) {
      toast({
        title: error?.data?.error,
        variant: "destructive",
      });
    }
  };
  const SidePostActions = ({ type }: SidePostProps) => {
    return (
      <div
        className={`flex ${
          type === "horizontal" ? "flex-row" : "flex-col"
        } gap-4 h-full w-full`}
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
            {postData?.vote.filter((vote) => vote.vote === "up-vote").length}
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
            {postData?.vote.filter((vote) => vote.vote === "down-vote").length}
          </span>
        </div>
      </div>
    );
  };

  if (!postData) {
    return null;
  }

  return (
    <div className="lg:card rounded-xl lg:max-w-lg lg:mx-auto flex lg:gap-8 w-full">
      <div className="lg:flex items-center min-w-[45px] hidden">
        <SidePostActions type="vertical" />
      </div>

      <div className="h-auto lg:min-w-[420px] bg-slate-50 border border-slate-400 transition ease-in-out cursor-pointer rounded-xl w-full">
        <div className="body lg:w-full">
          <div className="lg:w-full">
            <div className="flex items-center py-2 px-2">
              <img
                className="w-10 h-10 rounded-full object-cover mr-2"
                src={
                  postData?.author?.avatar
                    ? postData?.author?.avatar
                    : "/user-profile2.jpg"
                }
                alt="User avatar"
                onClick={() => navigate(`/user/profile/${postData?.author.id}`)}
              />
              <div className="flex justify-between w-full">
                <div
                  className="flex flex-col gap-1"
                  onClick={() =>
                    navigate(`/user/profile/${postData?.author.id}`)
                  }
                >
                  <p className="text-xs">
                    posted by : {postData?.author?.name}
                  </p>
                  <p className="text-[10px]">
                    Created At :{" "}
                    {moment(postData?.created_at).startOf("hour").fromNow()}
                  </p>
                </div>
                {isEditable ? (
                  <div>
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>

                          <DialogTrigger className="w-full">
                            <DropdownMenuItem className="w-full">
                              Edit
                            </DropdownMenuItem>
                          </DialogTrigger>

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => deleteHandler(post.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent className="p-0">
                        <UpdatePostModal
                          setPostData={setPostData}
                          post={post}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              {postData?.image ? (
                <div
                  className="p-2"
                  onClick={() => navigate(`/user/posts/${postData?.id}`)}
                >
                  <img
                    className={`w-full object-scale-down bg-white rounded-xl h-full max-h-[270px]  ${
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
                  className="text-black whitespace-pre-line break-words line-clamp-4 text-start"
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
                        {isLoading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          <Pin size={18} />
                        )}
                        <span className="ml-2">
                          {postData?.savedPost?.length}
                        </span>
                      </div>
                      <ShareLink link={window.location.href + "/" + post.id}>
                        <div className="flex items-center">
                          <Share2 size={18} />
                        </div>
                      </ShareLink>
                    </div>

                    <div className="flex items-center min-w-[45px] lg:hidden">
                      <SidePostActions type="horizontal" />
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
