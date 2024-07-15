import { ArrowDown, ArrowUp, Pin, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  return (
    <div
      className="card rounded-xl flex gap-8"
      onClick={() => navigate("/user/posts/:7887")}
    >
      <div className="flex items-center">
        <div className="flex gap-4 flex-col">
          <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
            <ArrowUp size={20} />
          </div>
          <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
            <ArrowDown size={20} />
          </div>
        </div>
      </div>
      <div className="h-auto max-w-md w-full border border-blue-200 bg-blue-100 hover:bg-blue-200 transition ease-in-out cursor-pointer  rounded-xl">
        <div className="body">
          {/* <img
            className="w-full object-cover rounded-xl"
            src="https://deep-image.ai/_next/static/media/app-info-generator.bf08e63e.webp"
          /> */}

          <div className="px-3 py-3">
            <p className="text-xs">Posted by : Pankj</p>
            <p className="text-black whitespace-pre-line break-words">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In massa
              ipsum, laoreet quis mollis nec,
            </p>
            <div className="footer flex justify-between mt-4">
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <Pin size={18} />
                  <span className="ml-2">7</span>
                </div>
                <div className="flex items-center">
                  <Share2 size={18} />
                  <span className="ml-2">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
