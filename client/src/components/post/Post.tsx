import { ArrowDown, ArrowUp, Pin, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Post as IPost } from "../../@types/post";

const Post = ({ post }: { post: IPost }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card rounded-xl max-w-md flex gap-8"
      onClick={() => navigate(`/user/posts/${post.id}`)}
    >
      <div className="flex items-center">
        <div className="flex gap-4 flex-col w-full">
          <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
            <ArrowUp size={20} />
          </div>
          <div className="border rounded-full border-slate-300 p-2 cursor-pointer">
            <ArrowDown size={20} />
          </div>
        </div>
      </div>

      <div className="h-auto min-w-[400px] border border-slate-400 transition ease-in-out cursor-pointer rounded-xl">
        <div className="body">
          <div className="">
            <div className="flex items-center py-2 px-2">
              <img
                className="w-10 h-10 rounded-full object-cover mr-2"
                src={
                  post?.author?.avatar
                    ? post?.author?.avatar
                    : "/user-profile2.jpg"
                }
                alt="User avatar"
              />
              <p className="text-xs">Posted by : {post?.author?.name}</p>
            </div>
            <div className="p-2">
              {post?.image ? (
                <img
                  className="w-full object-cover rounded-xl h-full"
                  src={post?.image}
                />
              ) : null}
            </div>

            <div className=" px-3 py-3 rounded-xl">
              <div
                className="text-black whitespace-pre-line break-words"
                dangerouslySetInnerHTML={{ __html: post.text }}
              ></div>
              <div className="footer flex justify-between mt-4">
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <Pin size={18} />
                    <span className="ml-2">{post.upvote}</span>
                  </div>
                  <div className="flex items-center">
                    <Share2 size={18} />
                    <span className="ml-2">{post.disvote}</span>
                  </div>
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
