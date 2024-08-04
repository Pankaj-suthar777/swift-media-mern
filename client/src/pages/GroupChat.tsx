import { useGetMyGroupChatsQuery } from "@/store/api/groupChatApi";

const GroupChat = () => {
  const { data } = useGetMyGroupChatsQuery({});
  console.log(data);
  return <div>GroupChat</div>;
};

export default GroupChat;
