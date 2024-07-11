import { useAppSelector } from "@/store/hooks";
import { Loader } from "lucide-react";
import { Link, useParams } from "react-router-dom";
interface Props {
  selectedChat: any;
  setSelectedChat: React.Dispatch<React.SetStateAction<any>>;
  searchValue: string;
  searchedResultUser: {
    email: string;
    id: number;
    name: string;
  }[];
  chats: any[];
  isLoading: boolean;
}

const ChatUserList = ({
  selectedChat,
  setSelectedChat,
  searchValue,
  searchedResultUser,
  chats,
  isLoading,
}: Props) => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const myId = userInfo.id;

  const { id } = useParams();

  return (
    <div>
      <div className="bg-white rounded-md overflow-hidden w-[300px]">
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
                      key={i}
                      to={`/user/chats/${user.id}`}
                      className={`flex items-center py-4 px-6 ${
                        selectedChat && selectedChat.id === id
                          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                          : ""
                      }`}
                    >
                      <img
                        className="w-10 h-10 rounded-full object-cover mr-4"
                        src="https://randomuser.me/api/portraits/women/72.jpg"
                        alt="User avatar"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-800">
                          {user.name}
                        </h3>
                        <p className="text-gray-600 text-xs">1034 points</p>
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
                (fri: number) => fri !== myId
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
                  <img
                    className="w-10 h-10 rounded-full object-cover mr-4"
                    src="https://randomuser.me/api/portraits/women/72.jpg"
                    alt="User avatar"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800">
                      {otherFriend.name}
                    </h3>
                    <p className="text-gray-600 text-xs">{chat.lastMessage}</p>
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
