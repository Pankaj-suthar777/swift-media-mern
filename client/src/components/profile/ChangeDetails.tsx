import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../custom/button";
import { DialogClose } from "../ui/dialog";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUserProfileMutation } from "@/store/api/authApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const profileDetailsChangeSchema = z.object({
  name: z.string().optional(),
});

const ChangeDetails = () => {
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const { userInfo } = useAppSelector((state) => state.auth);

  const [about, setAbout] = useState(userInfo?.about || "");

  const form = useForm<z.infer<typeof profileDetailsChangeSchema>>({
    resolver: zodResolver(profileDetailsChangeSchema),
    defaultValues: {
      name: userInfo?.name,
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (
    formData: z.infer<typeof profileDetailsChangeSchema>
  ) => {
    try {
      const data = await updateUserProfile({ ...formData, about }).unwrap();
      dispatch(setUser(data?.user));

      toast({
        title: data?.message,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "User info change failed",
        description: error?.data?.error,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Change Your Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="first name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>About</FormLabel>
              <div className="h-[250px] pb-10">
                <FormControl>
                  <ReactQuill
                    defaultValue={userInfo?.about}
                    theme="snow"
                    value={about}
                    onChange={(e) => setAbout(e)}
                    className="h-full"
                  />
                </FormControl>
              </div>
            </div>

            <CardFooter className="flex w-full justify-between p-0 pt-4">
              <DialogClose>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button disabled={isLoading} loading={isLoading} type="submit">
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangeDetails;
