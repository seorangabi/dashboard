import { generateErrorMessage } from "@/common/lib/utils";
import useLoginGoogleMutation from "@/common/mutations/useLoginGoogleMutation";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const LoginGooglePage = () => {
  const router = useRouter();
  const { data, status, update } = useSession();
  const { isPending, mutate, error } = useLoginGoogleMutation({
    options: {},
  });

  const loading = isPending || status === "loading";

  const errorMessage = error ? generateErrorMessage(error) : null;

  useEffect(() => {
    if (!data?.user?.email) return;

    mutate(
      {
        email: data?.user?.email,
      },
      {
        onSuccess: async (res) => {
          console.log("res", res);
          await update({
            ...data,
            accessToken: res.doc.accessToken,
          });
          router.push("/admin");
        },
      }
    );
  }, []);

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <>
        {loading && (
          <>
            <LoaderCircle className="animate-spin" />
            <span>Loading</span>
          </>
        )}

        {errorMessage && (
          <>
            <span>{errorMessage}</span>
          </>
        )}
      </>
    </div>
  );
};

export default LoginGooglePage;
