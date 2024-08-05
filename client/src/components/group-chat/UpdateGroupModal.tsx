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
import { FormEvent, useState } from "react";
import { Label } from "../ui/label";
import { User } from "@/@types/user";
import AddSearchUserInput from "../chat/AddSearchUserInput";
import { useUpdateGroupMutation } from "@/store/api/groupChatApi";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";
import { GroupChat } from "@/@types/groupChat";
import { useParams } from "react-router-dom";

const UpdateGroupModal = ({
  chatData,
  isChatLoading,
}: {
  chatData: GroupChat;
  isChatLoading: boolean;
}) => {
  const { id } = useParams();

  const [users, setUsers] = useState<User[]>(chatData?.friends || []);
  const [title, setTitle] = useState(chatData?.title || "");

  const [isLoading, setIsLoading] = useState(false);

  const [updateGroup] = useUpdateGroupMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (users.length === 0 || users.length === 1) {
      return toast({
        title: "Add more than 1 people",
        variant: "destructive",
      });
    }
    if (title?.trim() === "") {
      return toast({
        title: "Group name is required",
        variant: "destructive",
      });
    }

    try {
      setIsLoading(true);

      const body: any = {};

      body.users = users;
      body.title = title;

      const data = await updateGroup({ body, id }).unwrap();

      toast({
        title: data?.message,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: error?.data?.error,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isChatLoading) {
    return (
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>Please wait..</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-full w-full flex justify-center items-center">
            <Loader className="animate-spin" size={25} />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Edit Group</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-2">
          <div className="w-full pb-2">
            <Label className="">Group Name</Label>
            <div className="max-w-full mt-1">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
          </div>
          <div className="w-full pb-2">
            <Label className="">Add Users</Label>
            <div className="max-w-full mt-1">
              <AddSearchUserInput setUsers={setUsers} users={users} />
            </div>
          </div>

          <div className="h-24"></div>

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

export default UpdateGroupModal;
