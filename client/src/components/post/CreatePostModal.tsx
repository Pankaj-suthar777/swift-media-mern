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
import { FormEvent, useState } from "react";
import FileInput from "../ui/file-input";
import { useCreatePostMutation } from "@/store/api/postApi";
import { Label } from "../ui/label";
import { uploadFilesToFirebaseAndGetUrl } from "@/utils/file-upload";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const CreatePostModal = ({
  setModelOpen,
}: {
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState("ONLY_FOLLOWING");

  const [createPost] = useCreatePostMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (text.length < 10) {
      return toast({
        title: "Title is very short",
        variant: "destructive",
      });
    }
    try {
      setIsLoading(true);

      const body: any = { text, visibility };

      if (file) {
        const image = await uploadFilesToFirebaseAndGetUrl(file, "posts");
        body.image = image;
      }

      const data = await createPost(body).unwrap();

      toast({
        title: data?.message,
        variant: "default",
      });
      setModelOpen(false);
    } catch (error: any) {
      toast({
        title: error?.data?.error,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-2">
          <div className="w-full pb-4">
            <Label>Title</Label>
            <div className="h-[150px] mb-6 max-w-full">
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
            <FileInput
              image={file ? URL.createObjectURL(file) : ""}
              onChange={setFile}
            />
          </div>
          <Label>Visiblity</Label>
          <div>
            <RadioGroup
              defaultValue="comfortable"
              onValueChange={(e) => setVisibility(e)}
              value={visibility}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={"ONLY_FOLLOWING"} id="r1" />
                <Label htmlFor="r1">Only visible to followers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={"PUBLIC"} id="r2" />
                <Label htmlFor="r2">Public</Label>
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

export default CreatePostModal;
