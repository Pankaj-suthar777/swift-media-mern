import { PopularUsers } from "@/store/api/adminApi";
import { useState } from "react";

const PopularUserBlock = ({ user }: { user: PopularUsers }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="border border-slate-200 p-6 rounded-lg flex items-center gap-6 w-full">
      <div className="relative w-48 h-48">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
        )}
        <img
          onLoad={() => setImageLoading(false)}
          src={user.avatar || "/user-profile2.jpg"}
          alt={user.name}
          className={`rounded-lg h-full w-full object-cover transition-opacity duration-300 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-600 text-lg">{user.email}</p>
          </div>
          <div className="flex gap-8 text-center mt-4">
            <div>
              <p className="text-gray-500 text-sm">Followers</p>
              <p className="text-2xl font-semibold">{user.followersCount}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Following</p>
              <p className="text-2xl font-semibold">{user.followingCount}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Posts</p>
              <p className="text-2xl font-semibold">{user.posts}</p>
            </div>
          </div>
        </div>

        <div
          className="text-gray-800 mt-4 line-clamp-4 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: user.about }}
        ></div>
      </div>
    </div>
  );
};

export default PopularUserBlock;
