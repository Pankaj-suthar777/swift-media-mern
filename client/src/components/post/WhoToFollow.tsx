import { Button } from "../custom/button";
import { Home } from "lucide-react";

const WhoToFollow = () => {
  return (
    <div className="w-full bg-white rounded-lg">
      <div className="bg-green-200 ">
        <h1 className="text-md flex font-medium mb-2 justify-center gap-4 py-6 ">
          <Home /> <span>Home</span>
        </h1>
      </div>
      <div className="p-4 flex justify-center flex-col">
        <p className="text-center">You can create your own community</p>
        <Button className="mt-5 rounded-md">Create Community</Button>
      </div>
    </div>
  );
};

export default WhoToFollow;
