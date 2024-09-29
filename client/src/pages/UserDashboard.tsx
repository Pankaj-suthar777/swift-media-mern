import DashBox from "@/components/user-dashboard/DashBox";
import { RecentFollowers } from "@/components/user-dashboard/RecentFollowers";
import { PostActivity } from "@/components/user-dashboard/PostActivity";
import { MessagesSentChart } from "@/components/user-dashboard/MessagesSentChart";
import { useUserDashboardQuery } from "@/store/api/userApi";

const UserDashboard = () => {
  const { data, isLoading } = useUserDashboardQuery(null);

  if (isLoading) {
    return null;
  }
  return (
    <div className="overflow-y-auto h-screen md:px-0 px-2">
      <div className="grid gap-4 w-full overflow-y-auto md:mt-1">
        <div>
          <PostActivity />
        </div>
        <div>
          <MessagesSentChart />
        </div>
        <div className="w-full">
          <RecentFollowers
            isLoading={isLoading}
            followers={data?.recentFollowers}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <DashBox
              text="Total Post Comments"
              value={data?.totalCommentsCount}
            />
          </div>
          <DashBox
            text="Total Chats Your Part Of"
            value={data?.chatsYouPartOf}
          />
          <DashBox
            text="Total Messages You have sent"
            value={data?.messageCount}
          />
          <div className="flex gap-4">
            <DashBox
              text="Total Posts Upvotes"
              value={data?.postUpvotesCount}
            />
            <DashBox
              text="Total Posts Disvotes"
              value={data?.postDisvotesCount}
            />
          </div>
        </div>
      </div>
      <div className="h-12"></div>
    </div>
  );
};

export default UserDashboard;
