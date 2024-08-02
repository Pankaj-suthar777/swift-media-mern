import { Button } from "../custom/button";
import CreatePostModal from "./CreatePostModal";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useState } from "react";

const CreatePost = () => {
  const [modelOpen, setModelOpen] = useState(false);
  return (
    <div className="w-full bg-green-200  rounded-lg">
      <div className="p-4 flex justify-center flex-col">
        <p className="text-center">You can create your own post</p>
        <Dialog onOpenChange={() => setModelOpen(!modelOpen)} open={modelOpen}>
          <DialogTrigger>
            <Button
              className="mt-5 rounded-md w-full"
              onClick={() => setModelOpen(true)}
            >
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0">
            <CreatePostModal setModelOpen={setModelOpen} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreatePost;
