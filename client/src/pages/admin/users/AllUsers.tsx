import { DataTable } from "@/components/admin/users/all-users-table/data-table";
import { columns } from "@/components/admin/users/all-users-table/columns";
import { useGetAllUsersQuery } from "@/store/api/adminApi";
import { Loader } from "lucide-react";

const AllUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  return (
    <div className="container mx-auto py-10">
      {isLoading ? (
        <div>
          <Loader className="animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns as any} data={data?.users || []} />
      )}
    </div>
  );
};

export default AllUsers;
