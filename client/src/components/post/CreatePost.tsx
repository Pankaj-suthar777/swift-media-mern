import CreatePostModal from "./CreatePostModal";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import React, { useState } from "react";

const CreatePost = ({ children }: { children: React.ReactNode }) => {
  const [modelOpen, setModelOpen] = useState(false);

  return (
    <div className="w-full">
      <Dialog onOpenChange={() => setModelOpen(!modelOpen)} open={modelOpen}>
        <DialogTrigger asChild>
          <div onClick={() => setModelOpen(true)} className="w-full">
            {children}
          </div>
        </DialogTrigger>
        <DialogContent className="p-0">
          <CreatePostModal setModelOpen={setModelOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
