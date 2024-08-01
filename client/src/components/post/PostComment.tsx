import { Comment } from "@/@types/comment";
import { ArrowDown, ArrowUp, Reply, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ReplayComment from "./ReplayComment";
import { Textarea } from "../ui/textarea";
import { Button } from "../custom/button";
import { FormEvent } from "react";

interface Props {
  comment: Comment;
  setCommentReplay: React.Dispatch<React.SetStateAction<Comment | null>>;
  commentReplay: Comment | null;
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
  const clickReplayHandler = () => {
    setCommentReplay(comment);
  };

  return (
    <div>
      <div className="mt-4">
        <div className="flex w-full justify-between border rounded-md relative">
          <div className="p-3 flex gap-4">
            <div className="flex items-center mr-4">
              <div className="flex gap-4 flex-col">
                <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
                  <ArrowUp size={20} />
                </div>
                <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
                  <ArrowDown size={20} />
                </div>
              </div>
            </div>

            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={clickReplayHandler}
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

              <div className="flex w-full items-center justify-between bg-white p-2 border border-slate-200 mb-2">
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
            </div>
            <Button loading={isReplayCommentAdding} className="self-end ">
              Submit
            </Button>
          </form>
        )}
        {comment?.replayedComment?.map((replay, i: number) => {
          return (
            <ReplayComment
              replay={replay}
              key={i}
              replayedTo={comment?.author?.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostComment;
