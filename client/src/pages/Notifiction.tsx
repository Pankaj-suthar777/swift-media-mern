import NotificationBlock from "@/components/notification/NotificationBlock";
import FriendOfFriend from "@/components/post/FriendOfFriend";
import SearchBox from "@/components/SearchBox";
import BackButton from "@/components/ui/back-button";
import {
  useGetMyNotificationQuery,
  useSeenNotificationMutation,
} from "@/store/api/userApi";
import { Loader } from "lucide-react";
import { useEffect } from "react";

const Notification = () => {
  const { data, isLoading } = useGetMyNotificationQuery(null);
  const [seen] = useSeenNotificationMutation();

  useEffect(() => {
    const func = async () => {
      await seen(null);
    };
    func();
  }, [seen]);

  return (
    <div className="h-screen w-full flex flex-col items-center border border-r-0">
      <div className="flex gap-4 w-full h-full overflow-hidden">
        <div className="md:w-[90%] w-full overflow-auto">
          <div className="sticky top-0 w-full h-[50px] flex justify-start items-center bg-white bg-opacity-10 backdrop-blur-lg border-b border-opacity-30 rounded-lg">
            <BackButton showText={false} to="/user/posts" variant="link" />

            <h1>Notifications</h1>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto h-[calu(h-[100vh]-50px)] w-full items-center">
            <div className="w-full flex flex-col">
              {isLoading ? (
                <div className="flex justify-center items-center w-full mt-10">
                  <Loader className="animate-spin" />
                </div>
              ) : (
                data?.notifications.map((n, i) => (
                  <NotificationBlock key={i} notification={n} />
                ))
              )}
            </div>
          </div>
        </div>
        <div className="w-[50%] mt-4 md:flex h-fit justify-center overflow-hidden hidden mx-auto">
          <div className="flex flex-col gap-2 w-full">
            <div className="mb-4">
              <SearchBox />
            </div>

            <div className="">
              <FriendOfFriend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
