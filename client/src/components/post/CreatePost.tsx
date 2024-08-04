import CreatePostModal from "./CreatePostModal";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import React, { useState } from "react";

const CreatePost = ({
  children,
  showAllContent = true,
}: {
  children: React.ReactNode;
  showAllContent?: boolean;
}) => {
  const [modelOpen, setModelOpen] = useState(false);

  if (!showAllContent) {
    return (
      <Dialog onOpenChange={() => setModelOpen(!modelOpen)} open={modelOpen}>
        <DialogTrigger>
          <div onClick={() => setModelOpen(true)}>{children}</div>
        </DialogTrigger>
        <DialogContent className="p-0">
          <CreatePostModal setModelOpen={setModelOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="w-full bg-green-200 rounded-lg">
      <div className="p-4 flex justify-center flex-col">
        <p className="text-center">You can create your own post</p>
        <Dialog onOpenChange={() => setModelOpen(!modelOpen)} open={modelOpen}>
          <DialogTrigger>
            <div onClick={() => setModelOpen(true)}>{children}</div>
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
