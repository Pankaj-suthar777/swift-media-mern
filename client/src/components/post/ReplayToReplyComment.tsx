import { ArrowDown, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ReplayToReplayComment as IReplayToReplayComment } from "@/@types/ReplyToReply";
import { useToogleReplayedToReplyCommentVoteMutation } from "@/store/api/postApi";
import { useAppSelector } from "@/store/hooks";
import { VoteType } from "@/@types/vote";
import { toast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";

interface Props {
  comment: IReplayToReplayComment;
}

const ReplayToReplayComment = ({ comment }: Props) => {
  const [toogleComment] = useToogleReplayedToReplyCommentVoteMutation();
  const [commentData, setCommentData] = useState<IReplayToReplayComment | null>(
    null
  );

  useEffect(() => {
    if (comment) {
      setCommentData(comment);
    }
  }, [comment]);
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const ToogleVoteHandler = async (vote: VoteType) => {
    if (!comment?.id) return;

    const existingVoteIndex = comment?.replayToReplyCommentVote.findIndex(
      (v) => v.author_id === userInfo?.id
    );

    let updatedVotes;

    if (existingVoteIndex !== -1) {
      // If the user already voted update vote
      updatedVotes = comment?.replayToReplyCommentVote.map((c, index) =>
        index === existingVoteIndex ? { ...c, vote } : c
      );
    } else {
      // If the user hasn't voted
      updatedVotes = [
        ...comment.replayToReplyCommentVote,
        {
          vote,
          author_id: userInfo?.id as number,
          created_at: new Date(),
          reply_to_reply_comment: comment,
          reply_to_reply_comment_id: comment?.id as number,
          id: Math.floor(Math.random() * 1000),
        },
      ];
    }

    setCommentData({ ...comment, replayToReplyCommentVote: updatedVotes });

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

  const vote = commentData?.replayToReplyCommentVote?.find(
    (vote) => vote.author_id === userInfo?.id
  );

  return (
    <div className="">
      <div className="text-gray-300 font-bold pl-14 ">|</div>

      <div className="flex justify-between border ml-10 rounded-md bg-white">
        <div className="p-3 flex">
          <div className="flex items-center mr-4">
            <div className="flex gap-3 flex-col">
              <div className="flex gap-2 items-center">
                {commentData?.replayToReplyCommentVote && (
                  <div className="min-w-[10px]">
                    {
                      commentData?.replayToReplyCommentVote?.filter(
                        (v) => v.vote === "up-vote"
                      ).length
                    }
                  </div>
                )}{" "}
                <div
                  className={`border rounded-full border-slate-300 p-2 cursor-pointer ${
                    vote?.vote === "up-vote" ? "bg-green-200" : ""
                  }`}
                  onClick={() => ToogleVoteHandler("up-vote")}
                >
                  <ArrowUp size={15} />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                {commentData?.replayToReplyCommentVote && (
                  <div className="min-w-[10px]">
                    {
                      commentData?.replayToReplyCommentVote?.filter(
                        (v) => v.vote === "down-vote"
                      ).length
                    }
                  </div>
                )}{" "}
                <div
                  className={`border rounded-full border-slate-300 p-2 cursor-pointer ${
                    vote?.vote === "down-vote" ? "bg-red-200" : ""
                  }`}
                  onClick={() => ToogleVoteHandler("down-vote")}
                >
                  <ArrowDown size={15} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <Avatar>
                <AvatarImage
                  src={comment.author?.avatar || "/images/user-profile2.jpg"}
                />
                <AvatarFallback>{comment?.author?.name}</AvatarFallback>
              </Avatar>

              <h3 className="font-medium">
                {comment?.author?.name}
                <br />
              </h3>
            </div>
            <p className="text-gray-600 mt-2">
              <span className="mr-2">@{comment?.replay_to_author?.name}</span>
              <span>{comment?.text}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplayToReplayComment;
