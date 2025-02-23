import { User } from "@/@types/user";
import { useLazySearchUserQuery } from "@/store/api/userApi";
import { truncateText } from "@/utils/helper";
import { Loader, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "../ui/input";

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  users: User[];
}

const AddSearchUserInput = ({ setUsers, users }: Props) => {
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

  const addUserhandler = (newUser: User) => {
    const isAlreadyExists = users.find((user) => user.id === newUser.id);
    if (isAlreadyExists) return;

    setUsers([...users, newUser]);
    setSerachValue("");
  };

  const removeUserHandler = (userToRemove: User) => {
    const filterUsers = users.filter((user) => user.id !== userToRemove.id);
    setUsers(filterUsers);
  };

  return (
    <div className="relative group z-30">
      <div className="relative">
        <Input
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
          name="search"
          placeholder="search user"
        />
        <div
          className="absolute top-2.5 right-2.5"
          onClick={() => {
            setSerachValue("");
          }}
        >
          <X size={20} className="cursor-pointer" />
        </div>
      </div>
      <div
        className={`absolute left-0 w-full mt-2 bg-white dark:bg-gray-700 shadow-lg rounded-lg transition-all  ease-in-out duration-300 ${
          searchValue
            ? "opacity-100 max-h-[300px] py-2"
            : "opacity-0 max-h-0 py-0"
        }  ${
          data?.length === 0 && isLoading === true && isFetching === true
            ? "z-[333333]"
            : ""
        } `}
      >
        {isLoading || isFetching ? (
          <div className="p-4 text-gray-700 dark:text-gray-200 flex justify-center items-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto">
            {data?.map((user: User) => (
              <div
                key={user.id}
                onClick={() => addUserhandler(user)}
                className="flex items-center py-4 px-6 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              >
                <img
                  className="w-10 h-10 rounded-full object-cover mr-4"
                  src={user?.avatar ? user.avatar : "/user-profile2.jpg"}
                  alt="User avatar"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    <span className="md:block hidden">{user.name}</span>
                    <span className="md:hidden block">
                      {truncateText(user.name, 7)}
                    </span>
                  </h3>
                  <span className="md:block hidden">{user.email}</span>
                  <span className="md:hidden block">
                    {truncateText(user.email, 10)}
                  </span>
                </div>
              </div>
            ))}
            {data?.length === 0 &&
              isLoading === false &&
              isFetching === false && (
                <span className="py-12 flex justify-center w-full ">
                  No result found.
                </span>
              )}
          </div>
        )}
      </div>

      {users?.length !== 0 && (
        <div className="w-full border mt-5 p-2 flex flex-wrap gap-2">
          {users?.map((user, i) => (
            <div
              key={i}
              className={`px-4 py-2 text-slate-200 rounded-full bg-slate-800 flex gap-2 ${
                data?.length === 0 || data === undefined ? "z-30" : ""
              }`}
            >
              {user.name}
              <div
                className="cursor-pointer"
                onClick={() => removeUserHandler(user)}
              >
                <X />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddSearchUserInput;
