import { Button } from "@/common/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { Input } from "@/common/components/ui/input";
import { generateErrorMessage } from "@/common/lib/utils";
// import useLoginMutation from "@/common/mutations/useLoginMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (!response?.ok) {
        toast.error(response?.error);
        return;
      }
      router.push("/admin");
    } catch (error) {
      console.error(error);
      toast.error(generateErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 border rounded px-3 py-5"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" className="mx-auto flex w-full">
              {loading && <LoaderCircle className="animate-spin" />}
              Login
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="mx-auto flex w-full"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/admin/login/google",
                })
              }
            >
              {loading && <LoaderCircle className="animate-spin" />}
              Login With Google
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
