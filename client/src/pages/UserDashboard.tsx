import { GamesPlayedChart } from "@/components/user-dashboard/GamesPlayedChart";

const UserDashboard = () => {
  return (
    <div className="pl-4 pr-4">
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="lg:w-[40%] w-full">
          <GamesPlayedChart />
        </div>
        <div className="bg-white rounded-md h-fit py-6 lg:w-[30%] w-full flex justify-center items-center">
          <span className="font-medium">Total Games Played&nbsp;</span> : 45
        </div>
        <div className="bg-white rounded-md h-fit py-6 lg:w-[30%] w-full flex justify-center items-center">
          <span className="font-medium">Wins&nbsp;</span> : 45
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
