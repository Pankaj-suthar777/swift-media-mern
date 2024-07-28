import { User } from "@/@types/user";
import { Button } from "@/components/custom/button";
import { useLazySearchUserQuery } from "@/store/api/userApi";
import { useAppSelector } from "@/store/hooks";
import { ChevronLeft, Loader, Users } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SearchUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchUser, { data, isLoading }] = useLazySearchUserQuery();

  const { value } = useAppSelector((state) => state.search);

  useEffect(() => {
    const search = async () => {
      await searchUser(value);
    };
    search();
  }, [dispatch, searchUser, value]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center overflow-hidden">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  }

  if (!data || data?.length === 0) {
    return (
      <div className="w-full flex justify-center items-center overflow-hidden h-full">
        {value ? (
          <h1>No User Found.</h1>
        ) : (
          <div className="flex justify-center items-center flex-col h-full">
            <Users size={30} />
            <h1>Search People</h1>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pl-4 pr-4">
      <Button
        variant="outline"
        className="flex gap-2 mb-2 text-md bg-slate-100"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft color="black" /> Back
      </Button>
      <div className="overflow-hidden rounded-sm border border-stroke  shadow-default dark:border-strokedark dark:bg-boxdark relative">
        {data?.map((user: User, i: number) => (
          <Link
            key={i}
            to={`/user/profile/${user.id}`}
            className={`flex items-center py-4 px-6 bg-white`}
          >
            <div className="">
              <img
                className="w-10 h-10 rounded-full object-cover mr-4"
                src={user?.avatar ? user.avatar : "/user-profile2.jpg"}
                alt="User avatar"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">{user.name}</h3>
              <p className="text-gray-600 text-xs">{user.email}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchUser;
