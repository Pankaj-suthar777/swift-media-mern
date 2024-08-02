import { ArrowDown, ArrowUp, Reply, X } from "lucide-react";
import { ReplyToComment } from "@/@types/replayToComment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../custom/button";
import { Comment } from "@/@types/comment";
import { useAddReplayToReplyMutation } from "@/store/api/postApi";
import { FormEvent } from "react";
import { toast } from "../ui/use-toast";
import ReplayToReplayComment from "./ReplayToReplyComment";

interface Props {
  replay: ReplyToComment;
  replayedTo: string;
  clickReplayHandler: (comment: any) => void;
  commentReplay: Comment | ReplyToComment | null;
  setCommentReplay: React.Dispatch<React.SetStateAction<any>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const ReplayComment = ({
  replay,
  replayedTo,
  clickReplayHandler,
  commentReplay,
  setCommentReplay,
  text,
  setText,
}: Props) => {
  console.log(replay);
  const [addReplayToReply, { isLoading }] = useAddReplayToReplyMutation();

  const submitCommitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text?.trim() === "") {
      return;
    }

    try {
      const { data } = await addReplayToReply({
        text,
        replayToAuthorId: replay.author_id,
        replayToCommentId: replay.id,
      });
      toast({
        title: data?.message,
        variant: "default",
      });

      setText("");
      setCommentReplay(null);
    } catch (error: any) {
      console.log(error);
      toast({
        title: error?.data?.error,
        variant: "default",
      });
    }
  };

  return (
    <div>
      <div className="relative">
        <div
          className="absolute top-10 right-4 cursor-pointer z-20"
          onClick={() => clickReplayHandler(replay)}
        >
          <Reply size={20} />
        </div>
        <div className="text-gray-300 font-bold pl-14 ">|</div>

        <div className="flex justify-between border ml-5  rounded-md">
          <div className="p-3 flex">
            <div className="flex items-center mr-4">
              <div className="flex gap-4 flex-col">
                <div className="border rounded-full border-slate-300 p-1 cursor-pointer">
                  <ArrowUp size={15} />
                </div>
                <div className="border rounded-full border-slate-300 p-1 cursor-pointer">
                  <ArrowDown size={15} />
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage
                    src={replay.author?.avatar || "/images/user-profile2.jpg"}
                  />
                  <AvatarFallback>{replay?.author?.name}</AvatarFallback>
                </Avatar>

                <h3 className="font-medium">
                  {replay?.author?.name}
                  <br />
                </h3>
              </div>
              <p className="text-gray-600 mt-2">
                <span className="mr-2">@{replayedTo}</span>
                <span>{replay?.text}</span>
              </p>
            </div>
          </div>
        </div>
        {replay.id === commentReplay?.id && (
          <form className="flex flex-col ml-5" onSubmit={submitCommitHandler}>
            <div className="relative">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mb-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="add comment..."
              />

              <div className="flex w-full items-center bg-white p-2 border border-slate-200 mb-2">
                <div className="flex justify-between w-full items-center">
                  <div className="flex flex-col">
                    <div className="flex ">
                      <h1>Replaying to @</h1>
                      <p>{commentReplay?.author?.name}</p>
                    </div>
                    <p>{commentReplay?.text}</p>
                  </div>
                  <div
                    className="cursor-pointer mr-4"
                    onClick={() => setCommentReplay(null)}
                  >
                    <X size={20} />
                  </div>
                </div>
                <Button type="submit" loading={isLoading} className="">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
      {replay?.replies?.map((comment) => {
        return <ReplayToReplayComment comment={comment} />;
      })}
    </div>
  );
};

export default ReplayComment;
