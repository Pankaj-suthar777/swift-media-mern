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
import { Button } from "../custom/button";
import { DialogClose } from "../ui/dialog";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const profileDetailsChangeSchema = z.object({
  title: z
    .string()
    .min(4, { message: "post should be at least 4 charater long" }),
});

const CreatePostModal = () => {
  const [title, setTitle] = useState("");

  const form = useForm<z.infer<typeof profileDetailsChangeSchema>>({
    resolver: zodResolver(profileDetailsChangeSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (
    formData: z.infer<typeof profileDetailsChangeSchema>
  ) => {
    try {
      //   toast({
      //     title: data?.message,
      //     variant: "default",
      //   });
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
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={() => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <div className="h-[250px] pb-10">
                    <FormControl>
                      <ReactQuill
                        defaultValue={""}
                        theme="snow"
                        value={title}
                        onChange={(e) => setTitle(e)}
                        className="h-full"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="flex w-full justify-between p-0 pt-4">
              <DialogClose>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button
                //   disabled={isLoading} loading={isLoading}
                type="submit"
              >
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreatePostModal;
