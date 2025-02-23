import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/custom/button";
import { PasswordInput } from "@/components/custom/password-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChnagePasswordMutation } from "@/store/api/adminApi";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

const formSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, {
        message: "Please enter your old password",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
    newPassword: z
      .string()
      .min(1, {
        message: "Please enter new your password",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [changePassword, { data: changePasswordData, isLoading }] =
    useChnagePasswordMutation();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await changePassword(data);
  }

  useEffect(() => {
    if (changePasswordData) {
      toast({ title: changePasswordData.message });
    }
  }, [changePasswordData]);

  return (
    <div className="flex p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:w-[500px]"
        >
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" loading={isLoading}>
              Submit
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
