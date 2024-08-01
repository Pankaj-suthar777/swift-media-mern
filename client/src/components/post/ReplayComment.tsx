import { ArrowDown, ArrowUp } from "lucide-react";
import { ReplyToComment } from "@/@types/replayToComment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  replay: ReplyToComment;
  replayedTo: string;
}

const ReplayComment = ({ replay, replayedTo }: Props) => {
  return (
    <div className="">
      <div className="text-gray-300 font-bold pl-14">|</div>
      <div className="flex justify-between border ml-5  rounded-md">
        <div className="p-3">
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
      </div>
    </div>
  );
};

export default ReplayComment;
