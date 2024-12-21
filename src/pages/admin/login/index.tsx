import { Button } from "@/common/components/ui/button";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <div className="mx-auto max-w-md h-screen flex flex-col justify-center">
      <div>
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
          Login With Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
