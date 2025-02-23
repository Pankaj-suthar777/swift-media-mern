import { GroupChat } from "@/@types/groupChat";
import { Button } from "@/components/custom/button";
import UpdateGroupModal from "@/components/group-chat/UpdateGroupModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGetGroupChatByIdQuery } from "@/store/api/groupChatApi";
import { Link, useParams } from "react-router-dom";

const GroupChatInfoPage = () => {
  const { id } = useParams();
  const { data: chatData, isLoading } = useGetGroupChatByIdQuery(id);

  const chatInfo: GroupChat = chatData?.chatInfo;

  return (
    <div className="flex w-full gap-4 h-screen">
      <div className="w-full h-full bg-white">
        <div className="mt-10">
          <div className="flex flex-col justify-center h-full w-full items-center">
            <div>
              <Avatar className="cursor-pointer h-full w-full">
                <AvatarImage
                  className="w-24 h-24 object-cover"
                  src={
                    chatInfo?.avatar ? chatInfo?.avatar : "/user-profile2.jpg"
                  }
                />
                <AvatarFallback>{chatInfo?.title}</AvatarFallback>
              </Avatar>
            </div>
            <h1 className="mt-2 text-xl">{chatInfo?.title}</h1>

            <div className="mt-10 flex w-full flex-col">
              <div className="self-end mr-4 mb-2">
                <Dialog>
                  <DialogTrigger>
                    <Button className="w-full" variant={"outline"}>
                      Edit Group
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-0">
                    <UpdateGroupModal
                      chatData={chatData?.chatInfo}
                      isChatLoading={isLoading}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="w-full">
                {chatInfo?.friends.map((fri, i) => (
                  <Link
                    key={i}
                    to={`/user/profile/${fri.id}`}
                    className={`flex w-full items-center py-4 px-6 hover:bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800`}
                  >
                    <div className="">
                      <img
                        className="w-10 h-10 rounded-full object-cover mr-4"
                        src={fri?.avatar ? fri?.avatar : "/user-profile2.jpg"}
                        alt="User avatar"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800">
                        {fri.name}
                      </h3>
                      <p className="text-gray-600 text-xs">{fri?.email}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatInfoPage;
