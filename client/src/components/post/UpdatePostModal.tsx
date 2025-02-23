import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../custom/button";
import { DialogClose } from "../ui/dialog";
import { toast } from "../ui/use-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormEvent, useEffect, useState } from "react";
import FileInput from "../ui/file-input";
import { useUpdatePostMutation } from "@/store/api/postApi";
import { Label } from "../ui/label";
import { Post } from "@/@types/post";
import { uploadFilesToFirebaseAndGetUrl } from "@/utils/file-upload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const UpdatePostModal = ({
  post,
  setPostData,
}: {
  post: Post;
  setPostData: React.Dispatch<React.SetStateAction<Post | null>>;
}) => {
  const [text, setText] = useState(post.text);
  const [file, setFile] = useState<File | null>(null);
  const [visibility, setVisibility] = useState(post?.visibility);

  const [prviewImage, setPrviewImage] = useState<string>(post?.image || "");

  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let image = "";
      if (file) {
        image = await uploadFilesToFirebaseAndGetUrl(file, "/posts");
      }
      const data = await updatePost({
        body: {
          image,
          visibility,
          text,
        },
        id: post.id,
      }).unwrap();
      toast({
        title: data?.message,
        variant: "default",
      });
      setPostData({
        ...post,
        text: text ? text : post.text,
        visibility: visibility ? visibility : post.visibility,
        image: image ? image : post.image,
      });
    } catch (error: any) {
      toast({
        title: error?.data?.error,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (file) {
      setPrviewImage(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <Card className="w-full overflow-hidden max-h-[90vh]">
      <CardHeader>
        <CardTitle>Update Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-2">
          <div className="w-full pb-4">
            <Label>Title</Label>
            <div className="sm:h-[150px] h-[100px] sm:mb-8 mb-14 max-w-full">
              <ReactQuill
                defaultValue={""}
                theme="snow"
                value={text}
                onChange={(e) => setText(e)}
                className="h-full"
              />
            </div>
          </div>
          <div>
            <FileInput image={prviewImage} onChange={setFile} />
          </div>
          <Label>Visiblity</Label>
          <div>
            <RadioGroup
              defaultValue="comfortable"
              onValueChange={(e) => {
                if (e === "ONLY_FOLLOWING" || e === "PUBLIC") {
                  setVisibility(e);
                }
              }}
              value={visibility}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ONLY_FOLLOWING" id="ONLY_FOLLOWING" />
                <Label htmlFor="ONLY_FOLLOWING">
                  Only visible to followers
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PUBLIC" id="PUBLIC" />
                <Label htmlFor="PUBLIC">Public</Label>
              </div>
            </RadioGroup>
          </div>
          <CardFooter className="flex w-full justify-between p-0 pt-4">
            <DialogClose>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button disabled={isLoading} loading={isLoading} type="submit">
              Save
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdatePostModal;
