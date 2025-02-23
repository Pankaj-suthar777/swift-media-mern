import StatsCard from "@/components/admin/users/stats-card";
import { UsersPostsChart } from "@/components/admin/users/UsersPostsChart";
import { useGetDashboardDataQuery } from "@/store/api/adminApi";
import { Users, FileText } from "lucide-react";

const AdminDashboard = () => {
  const { data, isLoading } = useGetDashboardDataQuery();
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:gap-8 mt-4">
        {isLoading ? (
          <>
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </>
        ) : (
          <>
            <StatsCard
              Icon={Users}
              count={data?.userCount}
              text="Active accounts on the platform"
            />
            <StatsCard
              Icon={FileText}
              count={data?.postCount}
              text="Total posts on the platform"
            />
          </>
        )}
      </div>
      <div className="mt-6">
        {data && <UsersPostsChart chartData={data.chartData} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
