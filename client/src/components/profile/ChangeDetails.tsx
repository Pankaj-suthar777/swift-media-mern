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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileInput from "../ui/file-input";
import { uploadFilesToFirebaseAndGetUrl } from "@/utils/file-upload";

const profileDetailsChangeSchema = z.object({
  name: z.string().optional(),
});

const ChangeDetails = () => {
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const { userInfo } = useAppSelector((state) => state.auth);

  const [about, setAbout] = useState(userInfo?.about || "");

  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);

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
      const backgroundImageUrl = backgroundImage
        ? await uploadFilesToFirebaseAndGetUrl(
            backgroundImage,
            "backgroundImage"
          )
        : undefined;

      const updatedProfileData = {
        ...formData,
        about,
        ...(backgroundImageUrl && { backgroundImage: backgroundImageUrl }),
      };

      const data = await updateUserProfile(updatedProfileData).unwrap();

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
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="bg-img">Background Image</TabsTrigger>
        </TabsList>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <TabsContent value="account">
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
              </TabsContent>
              <TabsContent value="bg-img">
                <div className="p-8">
                  <FileInput
                    onChange={setBackgroundImage}
                    image={
                      backgroundImage
                        ? URL.createObjectURL(backgroundImage)
                        : userInfo?.backgroundImage
                        ? userInfo?.backgroundImage
                        : ""
                    }
                    label="background image"
                  />
                </div>
              </TabsContent>

              <CardFooter className="flex w-full justify-between p-0 pt-8">
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
      </Tabs>
    </Card>
  );
};

export default ChangeDetails;
