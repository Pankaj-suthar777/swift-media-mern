import PopularUserBlock from "@/components/admin/users/PopularUserBlock";
import { useGetPopularUsersQuery } from "@/store/api/adminApi";
// import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const PopularUsers = () => {
  const [user, setUser] = useState(null);
  const { data } = useGetPopularUsersQuery();

  useEffect(() => {
    if (data) {
      setUser(data.users[0] as any);
    }
  }, [data]);
  if (!user) {
    return null;
  }
  return (
    <div className="py-10 w-full flex-1">
      <div className="flex flex-col gap-4 w-full flex-1">
        {data?.users.map((u) => (
          <PopularUserBlock user={u} />
        ))}
      </div>
    </div>
  );
};

export default PopularUsers;
