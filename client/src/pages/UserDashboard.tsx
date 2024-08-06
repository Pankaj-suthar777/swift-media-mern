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
    <div className="pl-4 pr-4 overflow-y-auto h-viewport-minus-80px">
      <div className="grid md:grid-cols-2 gap-4 w-full overflow-y-auto">
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
            <DashBox text="Total Follows" value={data?.followCount} />
            <DashBox text="Total Followings" value={data?.followingCount} />
          </div>
          <div className="flex gap-4">
            <DashBox text="Total Posts" value={data?.postsCount} />
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
              value={data?.postDisvotesConnt}
            />
          </div>
        </div>
      </div>
      <div className="h-12"></div>
    </div>
  );
};

export default UserDashboard;
