import { ArrowDown, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ReplayToReplayComment as IReplayToReplayComment } from "@/@types/ReplyToReply";
import { useToogleReplayedToReplyCommentVoteMutation } from "@/store/api/postApi";
import { useAppSelector } from "@/store/hooks";
import { VoteType } from "@/@types/vote";
import { toast } from "../ui/use-toast";

interface Props {
  comment: IReplayToReplayComment;
}

const ReplayToReplayComment = ({ comment }: Props) => {
  const [toogleComment] = useToogleReplayedToReplyCommentVoteMutation();

  const { userInfo } = useAppSelector((state) => state.auth);

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

  const vote = comment.replayToReplyCommentVote?.find(
    (vote) => vote.author_id === userInfo.id
  );

  console.log(comment);

  return (
    <div className="">
      <div className="text-gray-300 font-bold pl-14 ">|</div>

      <div className="flex justify-between border ml-10  rounded-md">
        <div className="p-3 flex">
          <div className="flex items-center mr-4">
            <div className="flex gap-3 flex-col">
              <div className="flex gap-2 items-center">
                {comment?.replayToReplyCommentVote && (
                  <div className="min-w-[10px]">
                    {
                      comment?.replayToReplyCommentVote?.filter(
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
                {comment?.replayToReplyCommentVote && (
                  <div className="min-w-[10px]">
                    {
                      comment?.replayToReplyCommentVote?.filter(
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
