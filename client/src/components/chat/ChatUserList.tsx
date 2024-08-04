import { User } from "@/@types/user";
import { useAppSelector } from "@/store/hooks";
import { truncateText } from "@/utils/helper";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../custom/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import CreateGroupModal from "./CreateGroupModal";
interface Props {
  selectedChat: any;
  setSelectedChat: React.Dispatch<React.SetStateAction<any>>;
  searchValue: string;
  searchedResultUser: User[];
  chats: any[];
  isLoading: boolean;
  setSelectedSearchedUser: React.Dispatch<React.SetStateAction<User | null>>;
  onlineUsersId: string[];
  selectedSearchedUser: User | null;
}

const ChatUserList = ({
  selectedChat,
  setSelectedChat,
  searchValue,
  searchedResultUser,
  chats,
  isLoading,
  setSelectedSearchedUser,
  onlineUsersId,
  selectedSearchedUser,
}: Props) => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const myId = userInfo.id;

  return (
    <div>
      <div className="bg-white rounded-md overflow-hidden w-[300px]">
        <div className="flex justify-between mx-4 pb-2">
          <Dialog>
            <DialogTrigger>
              <Button variant={"outline"}>Create Group</Button>
            </DialogTrigger>
            <DialogContent className="p-0">
              <CreateGroupModal />
            </DialogContent>
          </Dialog>

          <Button variant={"outline"}>Close</Button>
        </div>
        <ul className="divide-y divide-gray-200 w-full">
          {searchValue ? (
            <div className="w-full">
              <div className="text-center flex justify-center gap-2">
                {searchedResultUser &&
                  searchedResultUser.length > 0 &&
                  "Search Result"}
              </div>
              {searchedResultUser && searchedResultUser.length > 0 ? (
                searchedResultUser.map((user, i) => {
                  return (
                    <Link
                      onClick={() => {
                        setSelectedSearchedUser(user);
                      }}
                      key={i}
                      to={`/user/chats/new`}
                      className={`flex items-center py-4 px-6 ${
                        selectedSearchedUser?.id &&
                        selectedSearchedUser?.id === user.id
                          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                          : ""
                      }`}
                    >
                      <div className="">
                        <img
                          className="w-10 h-10 rounded-full object-cover mr-4"
                          src={
                            user?.avatar ? user?.avatar : "/user-profile2.jpg"
                          }
                          alt="User avatar"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-800">
                          {user.name}
                        </h3>
                        <p className="text-gray-600 text-xs">{user?.email}</p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="text-center flex justify-center gap-2">
                  No user found.
                </div>
              )}
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader className="ml-2 h-12 w-12 animate-spin" />
            </div>
          ) : (
            chats &&
            chats.map((chat: any, i: number) => {
              const otherFriend = chat.friends.find(
                (fri: any) => fri.id !== myId
              );

              return (
                <Link
                  key={i}
                  to={`/user/chats/${chat.id}`}
                  className={`flex items-center py-4 px-6 ${
                    selectedChat && selectedChat.id === chat.id
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                      : ""
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="relative">
                    <img
                      className="w-10 h-10 rounded-full object-cover mr-4"
                      src={
                        otherFriend?.avatar
                          ? otherFriend?.avatar
                          : "/user-profile2.jpg"
                      }
                      alt="User avatar"
                    />
                    {onlineUsersId.includes(String(otherFriend.id)) && (
                      <div className="bg-green-500 w-2 h-2 absolute rounded-full right-4 bottom-1"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800">
                      {otherFriend.name}
                    </h3>
                    <p className="text-gray-600 text-xs">
                      {truncateText(chat.lastMessage, 16)}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatUserList;
