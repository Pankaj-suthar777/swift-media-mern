import { HTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { PasswordInput } from "@/components/custom/password-input";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/store/api/authApi";
import { setUser } from "@/store/features/userSlice";
import { toast } from "../ui/use-toast";
import { useAppDispatch } from "@/store/hooks";
import GoogleSigninButton from "./providers/google-signin-button";
import GithubSigninButton from "./providers/github-signin-button";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading, error, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const response = await login(data);

    if (response.data?.token) {
      localStorage.setItem("accessToken", response.data?.token);
      dispatch(setUser(response.data?.userInfo));
      toast({
        title: "Login success",
        description: response.data?.message,
      });
      navigate("/user/dashboard");
    }
  }

  useEffect(() => {
    if (isError) {
      toast({
        // @ts-expect-error fixing needed here for type
        title: error?.data?.error,
      });
    }
  }, [isError, error]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-muted-foreground hover:opacity-75"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" loading={isLoading}>
              Login
            </Button>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            <GoogleSigninButton />
            <GithubSigninButton />
          </div>
        </form>
      </Form>
    </div>
  );
}
