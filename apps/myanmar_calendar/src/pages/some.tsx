import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import "../assets/styles/globals.css";
import "../assets/styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
