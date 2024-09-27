import { User } from "@/@types/user";
import UserSeklton from "@/components/Skelton/UserSeklton";
import BackButton from "@/components/ui/back-button";
import { useGetUserFollowingListQuery } from "@/store/api/userApi";
import { Link, useParams } from "react-router-dom";
const dummyData = new Array(6).fill("");

const FollowingListPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUserFollowingListQuery(id);
  return (
    <div className="w-full">
      <div className="sm:ml-4 sm:mr-4 mr-2 ml-2 mb-2">
        <BackButton variant="link" />
      </div>
      <div className="bg-white sm:ml-4 sm:mr-4 mr-2 ml-2">
        {isLoading
          ? dummyData.map((item, i) => <UserSeklton key={i + item} />)
          : data?.following?.map((user: User, i: number) => (
              <Link
                to={`/user/profile/${user.id}`}
                key={i}
                className={`flex items-center py-4 px-6 hover:bg-gradient-to-tr hover:from-indigo-200 hover:to-indigo-100 hover:text-indigo-800"
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
                  <h3 className="text-sm font-medium text-gray-800">
                    <span>{user.name}</span>
                  </h3>
                  <p className="text-gray-600 text-xs">
                    <span>{user.email}</span>
                  </p>
                </div>
              </Link>
            ))}
      </div>
      {data?.following?.length === 0 && (
        <div className="flex justify-center">
          <h1>No one following yet.</h1>
        </div>
      )}
    </div>
  );
};

export default FollowingListPage;
