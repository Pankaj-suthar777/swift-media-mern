import { useAppSelector } from "@/store/hooks";
import { Facebook, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  return (
    <div>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="flex w-full justify-center items-center mt-5">
            <img
              src={"https://github.com/shadcn.png"}
              className="h-24 w-24 rounded-full"
              alt="profile"
            />
          </div>
          <div className="mt-4">
            <h3 className="mb-8 text-2xl font-semibold text-black dark:text-white">
              {userInfo?.name}
            </h3>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  259
                </span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {userInfo?.followers}
                </span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {userInfo?.followings}
                </span>
                <span className="text-sm">Following</span>
              </div>
            </div>

            <div className="mx-auto max-w-2xl clear-start">
              <h4 className="font-semibold text-black dark:text-white mb-6 mt-4">
                About Me
              </h4>
              <p className="mt-4.5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque posuere fermentum urna, eu condimentum mauris
                tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
                ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
                pharetra ligula sed, aliquam lacus.
              </p>
            </div>

            <div className="mt-6.5">
              <h4 className="mb-3.5 font-medium text-black dark:text-white">
                Follow me on
              </h4>
              <div className="flex items-center justify-center gap-3.5">
                <Link to={"#"}>
                  <Github size={25} />
                </Link>
                <Link to={"#"}>
                  <Twitter size={25} />
                </Link>
                <Link to={"#"}>
                  <Facebook size={25} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
