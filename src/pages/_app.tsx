import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { FC, ReactNode } from "react";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/common/components/ui/sonner";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { isPublicPath } from "@/middleware";
import { LoaderCircle } from "lucide-react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
          },
        },
      })
  );

  if (!router.isReady) return <div></div>;

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Auth>
            <Component {...pageProps} />
            <Toaster />
          </Auth>
        </SessionProvider>
      </HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

const Auth: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const pageIsPublic = isPublicPath(router.pathname);

  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status, data } = useSession({ required: false });

  console.log(data);

  if (status === "loading")
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );

  return children;
};
