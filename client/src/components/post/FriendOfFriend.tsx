import { User } from "@/@types/user";
import { useGetRecommendedUserQuery } from "@/store/api/userApi";
import { Link } from "react-router-dom";
import { UserSeklton } from "../Skelton/UserSeklton";

const dummyData = new Array(6).fill("");

const FriendOfFriend = () => {
  const { data, isLoading } = useGetRecommendedUserQuery({});

  return (
    <div>
      {isLoading
        ? dummyData.map((item, i) => <UserSeklton key={i + item} />)
        : data?.map((user: User, i: number) => (
            <Link
              to={`/user/profile/${user.id}`}
              key={i}
              className={`flex items-center py-4 px-6 hover:bg-gradient-to-tr hover:from-indigo-200 hover:to-indigo-100 hover:text-indigo-800"
            `}
            >
              <div className="">
                <img
                  className="w-10 h-10 rounded-full object-cover mr-4"
                  src={user?.avatar ? user.avatar : "/user-profile2.jpg"}
                  alt="User avatar"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium te{xt-gray-800">
                  {user.name}
                </h3>
                <p className="text-gray-600 text-xs">{user.email}</p>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default FriendOfFriend;
