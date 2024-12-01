import { Toaster } from "@/common/components/ui/sonner";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <Toaster />
        <NextScript />
      </body>
    </Html>
  );
}
