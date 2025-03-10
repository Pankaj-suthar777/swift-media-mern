import { User } from "@/@types/user";
import { useGetRecommendedUserQuery } from "@/store/api/userApi";
import { Link } from "react-router-dom";
import UserSeklton from "../Skelton/UserSeklton";
import { truncateText } from "@/utils/helper";

const dummyData = new Array(6).fill("");

const FriendOfFriend = () => {
  const { data, isLoading } = useGetRecommendedUserQuery({});

  return (
    <div className="rounded-3xl bg-white h-full">
      <h2 className="pt-4 pb-2 px-6 text-xl font-bold text-start text-slate-800">
        People You May Know
      </h2>

      {isLoading
        ? dummyData.map((item, i) => <UserSeklton key={i + item} />)
        : data?.map((user: User, i: number) => (
            <Link
              to={`/user/profile/${user.id}`}
              key={i}
              className={`flex items-center py-4 px-4 hover:bg-gradient-to-tr hover:from-indigo-200 hover:to-indigo-100 hover:text-indigo-800"
            `}
            >
              <div className="w-10 h-10 rounded-full mr-4">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={user?.avatar ? user.avatar : "/user-profile2.jpg"}
                  alt="User avatar"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium te{xt-gray-800">
                  <span className="md:block hidden">{user.name}</span>
                  <span className="md:hidden block">
                    {truncateText(user.name, 7)}
                  </span>
                </h3>
                <p className="text-gray-600 text-xs">
                  <span className="md:block hidden">{user.email}</span>
                  <span className="md:hidden block">
                    {truncateText(user.email, 10)}
                  </span>
                </p>
              </div>
            </Link>
          ))}
      <div className="pb-4 pt-2 px-6 text-md text-start text-blue-600">
        <Link to={"/user/people"}>Show more</Link>
      </div>
    </div>
  );
};

export default FriendOfFriend;
