import {
  useAddReplayCommentMutation,
  useGetPostCommentsQuery,
} from "@/store/api/postApi";
import { useParams } from "react-router-dom";
import PostComment from "./PostComment";
import { Comment } from "@/@types/comment";
import { FormEvent, useState } from "react";
import { toast } from "../ui/use-toast";
import { Loader } from "lucide-react";

interface Props {
  setCommentReplay: React.Dispatch<React.SetStateAction<any>>;
  commentReplay: Comment | null;
}

const CommentDiscussion = ({ commentReplay, setCommentReplay }: Props) => {
  const { id } = useParams();
  const { data, isLoading: isCommentsLoading } = useGetPostCommentsQuery(id);
  const [text, setText] = useState("");

  const [addReplayComment, { isLoading }] = useAddReplayCommentMutation();

  const submitCommitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text?.trim() === "") {
      return;
    }
    try {
      if (!commentReplay?.id) return;
      const { data } = await addReplayComment({ id: commentReplay.id, text });
      toast({
        title: data?.message,
        variant: "default",
      });

      setText("");
      setCommentReplay(null);
    } catch (error: any) {
      toast({
        title: error?.data?.error,
        variant: "default",
      });
    }
  };

  return (
    <div>
      <div className="w-full bg-white rounded-lg">
        <div className="flex flex-col gap-5">
          {/* Comment Container */}
          <div>
            {isCommentsLoading ? (
              <div className="w-full flex justify-center">
                <Loader className="animate-spin" />
              </div>
            ) : (
              data?.comments?.map((comment: Comment, i: number) => (
                <PostComment
                  setCommentReplay={setCommentReplay}
                  commentReplay={commentReplay}
                  comment={comment}
                  key={i}
                  submitReplay={submitCommitHandler}
                  isReplayCommentAdding={isLoading}
                  setText={setText}
                  text={text}
                />
              ))
            )}
            <div className="h-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentDiscussion;
