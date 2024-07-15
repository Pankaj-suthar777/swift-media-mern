import { Button } from "@/components/custom/button";
import Post from "@/components/post/Post";
import WhoToFollow from "@/components/post/WhoToFollow";
import { Textarea } from "@/components/ui/textarea";

{
  /* <div className="flex gap-1">
<Button className="text-xs">Markdown Post</Button>
</div> */
}

const Posts = () => {
  return (
    <div className="h-viewport-minus-80px w-full flex flex-col items-center">
      <div className="mt-2 flex gap-4 w-full h-full">
        <div className="sm:w-[60%] w-full flex flex-col gap-4 justify-center items-center border pt-4 pb-1 overflow-y-auto h-full">
          <h1>Your Feed</h1>
          <div className="flex flex-col gap-4 overflow-y-auto border-t border-slate-300 h-full w-full px-4 items-center">
            <div className="card mt-2 flex justify-end gap-2 p-1 w-full">
              <Button className="text-xs h-full">Add Post</Button>
            </div>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
        <div className="w-[30%] sm:flex h-fit justify-center hidden">
          <WhoToFollow />
        </div>
      </div>
    </div>
  );
};

export default Posts;
