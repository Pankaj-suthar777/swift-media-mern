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

const profileDetailsChangeSchema = z.object({
  github: z.string().optional(),
  twitter: z.string().optional(),
});

const ChangeDetails = () => {
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const { userInfo } = useAppSelector((state) => state.auth);

  const form = useForm<z.infer<typeof profileDetailsChangeSchema>>({
    resolver: zodResolver(profileDetailsChangeSchema),
    defaultValues: {
      github: userInfo?.github,
      twitter: userInfo?.twitter,
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (
    formData: z.infer<typeof profileDetailsChangeSchema>
  ) => {
    try {
      const data = await updateUserProfile({ ...formData }).unwrap();
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
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Link</FormLabel>
                  <FormControl>
                    <Input placeholder="your github account link" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter/X Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your twitter/X account link"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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
    </Card>
  );
};

export default ChangeDetails;
