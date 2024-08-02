import { Comment } from "@/@types/comment";
import { ArrowDown, ArrowUp, Reply, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ReplayComment from "./ReplayComment";
import { Textarea } from "../ui/textarea";
import { Button } from "../custom/button";
import { FormEvent } from "react";
import { ReplyToComment } from "@/@types/replayToComment";
import { VoteType } from "@/@types/vote";
import { useToogleCommentVoteMutation } from "@/store/api/postApi";
import { toast } from "../ui/use-toast";
import { useAppSelector } from "@/store/hooks";

interface Props {
  comment: Comment;
  setCommentReplay: React.Dispatch<
    React.SetStateAction<Comment | null | ReplyToComment>
  >;
  commentReplay: Comment | null | ReplyToComment;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  submitReplay: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  isReplayCommentAdding: boolean;
}

const PostComment = ({
  comment,
  setCommentReplay,
  commentReplay,
  setText,
  submitReplay,
  text,
  isReplayCommentAdding,
}: Props) => {
  const [toogleComment] = useToogleCommentVoteMutation();

  const { userInfo } = useAppSelector((state) => state.auth);

  const clickReplayHandler = (comment: Comment | ReplyToComment) => {
    setCommentReplay(comment);
  };

  const ToogleVoteHandler = async (vote: VoteType) => {
    if (!comment?.id) return;

    try {
      const data = await toogleComment({
        vote,
        id: comment?.id,
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

  const vote = comment.vote.find((vote) => vote.author_id === userInfo.id);

  return (
    <div>
      <div className="mt-4">
        <div className="flex w-full justify-between border rounded-md relative">
          <div className="p-3 flex ">
            <div className="flex items-center mr-4">
              <div className="flex gap-3 flex-col ">
                <div className="flex gap-2 items-center ">
                  {comment?.vote && (
                    <div className="min-w-[10px]">
                      {
                        comment?.vote?.filter((v) => v.vote === "up-vote")
                          .length
                      }
                    </div>
                  )}
                  <div
                    className={`border rounded-full border-slate-300 p-2 cursor-pointer ${
                      vote?.vote === "up-vote" ? "bg-green-200" : ""
                    }`}
                    onClick={() => ToogleVoteHandler("up-vote")}
                  >
                    <ArrowUp size={20} />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {comment?.vote && (
                    <div className="min-w-[10px]">
                      {
                        comment?.vote?.filter((v) => v.vote === "down-vote")
                          .length
                      }
                    </div>
                  )}
                  <div
                    className={`border rounded-full border-slate-300 p-2 cursor-pointer ${
                      vote?.vote === "down-vote" ? "bg-red-200" : ""
                    }`}
                    onClick={() => ToogleVoteHandler("down-vote")}
                  >
                    <ArrowDown size={20} />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => clickReplayHandler(comment)}
            >
              <Reply size={20} />
            </div>

            <div className="flex flex-col justify-center items-start w-full">
              <div className="flex gap-3 items-center w-full">
                <Avatar>
                  <AvatarImage
                    src={comment.author?.avatar || "/images/user-profile2.jpg"}
                  />
                  <AvatarFallback>{comment?.author?.name}</AvatarFallback>
                </Avatar>

                <h3 className="font-medium overflow-hidden break-all w-full">
                  {comment?.author?.name}
                  <br />
                </h3>
              </div>
              <p className="text-gray-600 mt-2 mb-2 break-all w-full">
                {comment?.text}
              </p>
            </div>
          </div>
        </div>
        {commentReplay && commentReplay.id === comment.id && (
          <form onSubmit={submitReplay} className="flex flex-col">
            <div className="relative">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mb-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="add comment..."
              />

              <div className="flex w-full items-center bg-white p-2 border border-slate-200">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h1>Replaying to @{commentReplay?.author?.name}</h1>
                    <p>{commentReplay?.text}</p>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setCommentReplay(null)}
                  >
                    <X size={20} />
                  </div>
                </div>
                <Button loading={isReplayCommentAdding} className="ml-4">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        )}
        {comment?.replayedComment?.map((replay, i: number) => {
          return (
            <ReplayComment
              commentReplay={commentReplay}
              setCommentReplay={setCommentReplay}
              clickReplayHandler={clickReplayHandler}
              replay={replay}
              key={i}
              replayedTo={comment?.author?.name}
              setText={setText}
              text={text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostComment;
