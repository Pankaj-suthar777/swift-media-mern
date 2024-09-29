import FriendOfFriend from "@/components/post/FriendOfFriend";
import SearchBox from "@/components/SearchBox";
import BackButton from "@/components/ui/back-button";

const Notification = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center border border-r-0">
      <div className="flex gap-4 w-full h-full overflow-hidden">
        <div className="sm:w-[90%] overflow-auto">
          <div className="sticky top-0 w-full h-[50px] flex justify-start items-center bg-white bg-opacity-10 backdrop-blur-lg border-b border-opacity-30 rounded-lg">
            <BackButton showText={false} to="/user/posts" variant="link" />

            <h1>Notifications</h1>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto h-[calu(h-[100vh]-50px)] w-full items-center">
            {/* <div className="w-[300px] h-[400px]"></div> */}
          </div>
        </div>
        <div className="w-[50%] mt-4 sm:flex h-fit justify-center overflow-hidden hidden mx-auto">
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
