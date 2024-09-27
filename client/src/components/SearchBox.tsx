import { User } from "@/@types/user";
import { useLazySearchUserQuery } from "@/store/api/userApi";
import { truncateText } from "@/utils/helper";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

const SearchBox = () => {
  const [searchValue, setSerachValue] = useState("");
  const [value] = useDebounce(searchValue, 700);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSerachValue(e.target.value);
  };

  const [searchUser, { data, isLoading, isFetching }] =
    useLazySearchUserQuery();

  useEffect(() => {
    const search = async () => {
      await searchUser(value);
    };
    search();
  }, [value, searchUser]);

  return (
    <div className="relative mx-2 sm:mx-0 group z-30">
      <input
        autoComplete="off"
        value={searchValue}
        onBlur={() => {
          const id = setTimeout(() => {
            setSerachValue("");
          }, 1000);
          return () => clearTimeout(id);
        }}
        onChange={onChangeHandler}
        type="text"
        name="q"
        className="w-full border h-12 shadow p-4 rounded-3xl dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
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
      <div className="absolute left-0 w-full mt-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden transition-all transform origin-top scale-y-0 group-focus-within:scale-y-100 h-0 group-focus-within:h-fit max-h-[300px] min-h-[100px] overflow-y-auto">
        {searchValue.length === 0 ? (
          <span className="text-md text-center w-full flex justify-center pt-4">
            Try searching for people
          </span>
        ) : (
          <p className="text-gray-700 dark:text-gray-200">
            {isLoading || isFetching ? (
              <div className="h-full w-full flex justify-center items-center pt-4">
                <Loader className="animate-spin" />
              </div>
            ) : (
              data?.map((user: User, i: number) => (
                <Link
                  key={i}
                  to={`/user/profile/${user.id}`}
                  className={`flex items-center sm:py-4 py-2 px-4 bg-white hover:bg-slate-100`}
                >
                  <div className="">
                    <img
                      className="w-10 h-10 rounded-full object-cover sm:mr-4 mr-2"
                      src={user?.avatar ? user.avatar : "/user-profile2.jpg"}
                      alt="User avatar"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800">
                      <span className="text-xs">
                        {truncateText(user.name, 30)}
                      </span>
                    </h3>
                    <span className="text-xs">
                      {truncateText(user.email, 30)}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
