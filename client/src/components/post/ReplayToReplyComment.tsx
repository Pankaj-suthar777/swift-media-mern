import { ArrowDown, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ReplayToReplayComment as IReplayToReplayComment } from "@/@types/ReplyToReply";

interface Props {
  comment: IReplayToReplayComment;
}

const ReplayToReplayComment = ({ comment }: Props) => {
  return (
    <div className="">
      <div className="text-gray-300 font-bold pl-14 ">|</div>

      <div className="flex justify-between border ml-10  rounded-md">
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
