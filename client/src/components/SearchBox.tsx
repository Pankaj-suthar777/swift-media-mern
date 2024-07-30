import { User } from "@/@types/user";
import { useLazySearchUserQuery } from "@/store/api/userApi";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchBox = () => {
  const [searchValue, setSerachValue] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSerachValue(e.target.value);
  };

  const [searchUser, { data, isLoading }] = useLazySearchUserQuery();

  useEffect(() => {
    const search = async () => {
      await searchUser(searchValue);
    };
    search();
  }, [searchValue, searchUser]);

  return (
    <div className="relative md:w-[600px] group">
      <input
        onFocus={() => {}}
        value={searchValue}
        onChange={onChangeHandler}
        type="text"
        name="q"
        className="w-full border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
        placeholder="search"
      />
      <button type="submit">
        <svg
          className="text-teal-400 h-5 w-5 absolute top-3.5 right-3 fill-current dark:text-teal-300"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          xmlSpace="preserve"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
        </svg>
      </button>
      <div className="absolute left-0 w-full mt-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden transition-all transform origin-top scale-y-0 group-focus-within:scale-y-100 h-0 group-focus-within:h-[400px] overflow-y-auto">
        <p className="p-4 text-gray-700 dark:text-gray-200">
          {isLoading ? (
            <Loader className="animate-spin" />
          ) : (
            data?.map((user: User, i: number) => (
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
                  <h3 className="text-sm font-medium text-gray-800">
                    {user.name}
                  </h3>
                  <p className="text-gray-600 text-xs">{user.email}</p>
                </div>
              </Link>
            ))
          )}
        </p>
      </div>
    </div>
  );
};

export default SearchBox;
