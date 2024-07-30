import { ArrowDown, ArrowUp, MessageSquare } from "lucide-react";

const CommentDiscussion = () => {
  return (
    <div>
      <div className="w-full bg-white rounded-lg">
        <div className="flex flex-col gap-5 m-3">
          {/* Comment Container */}
          <div>
            <div className="flex w-full justify-between border rounded-md">
              <div className="p-3">
                <div className="flex gap-3 items-center">
                  <img
                    src="https://avatars.githubusercontent.com/u/22263436?v=4"
                    className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                  />
                  <h3 className="font-medium">
                    User 1
                    <br />
                  </h3>
                </div>
                <p className="text-gray-600 mt-2 mb-2">
                  this is sample commnent
                </p>
                <div className="flex gap-2 items-center">
                  <MessageSquare size={20} />
                  <div>23</div>
                </div>
              </div>
              <div className="flex items-center mr-4">
                <div className="flex gap-4 flex-col">
                  <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
                    <ArrowUp size={20} />
                  </div>
                  <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
                    <ArrowDown size={20} />
                  </div>
                </div>
              </div>
            </div>
            {/* Reply Container  */}
            <div className="text-gray-300 font-bold pl-14">|</div>
            <div className="flex justify-between border ml-5  rounded-md">
              <div className="p-3">
                <div className="flex gap-3 items-center">
                  <img
                    src="https://avatars.githubusercontent.com/u/22263436?v=4"
                    className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                  />
                  <h3 className="font-medium">
                    User 1
                    <br />
                  </h3>
                </div>
                <p className="text-gray-600 mt-2">this is sample commnent</p>
              </div>
              <div className="flex items-center mr-4">
                <div className="flex gap-4 flex-col">
                  <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
                    <ArrowUp size={20} />
                  </div>
                  <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
                    <ArrowDown size={20} />
                  </div>
                </div>
              </div>
            </div>
            {/* END Reply Container  */}
            {/* Reply Container  */}
            <div className="text-gray-300 font-bold pl-14">|</div>
            <div className="flex justify-between border ml-5  rounded-md">
              <div className="p-3">
                <div className="flex gap-3 items-center">
                  <img
                    src="https://avatars.githubusercontent.com/u/22263436?v=4"
                    className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                  />
                  <h3 className="font-medium">
                    User 1
                    <br />
                  </h3>
                </div>
                <p className="text-gray-600 mt-2">this is sample commnent</p>
              </div>
              <div className="flex items-center mr-4">
                <div className="flex gap-4 flex-col">
                  <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
                    <ArrowUp size={20} />
                  </div>
                  <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
                    <ArrowDown size={20} />
                  </div>
                </div>
              </div>
            </div>
            {/* END Reply Container  */}
          </div>
          {/* END Comment Container  */}
          <div className="flex w-full justify-between border rounded-md">
            <div className="p-3">
              <div className="flex gap-3 items-center">
                <img
                  src="https://avatars.githubusercontent.com/u/22263436?v=4"
                  className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400"
                />
                <h3 className="font-medium">
                  User 1
                  <br />
                </h3>
              </div>
              <p className="text-gray-600 mt-2">this is sample commnent</p>
              <button className="text-right text-blue-500">Reply</button>
            </div>
            <div className="flex items-center mr-4">
              <div className="flex gap-4 flex-col">
                <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
                  <ArrowUp size={20} />
                </div>
                <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
                  <ArrowDown size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentDiscussion;
