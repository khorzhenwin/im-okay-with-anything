import "@/styles/globals.scss";
import "@/styles/preflight.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement } from "react";
import Provider from "@/components/utils/Provider";
import AuthGuard from "@/features/Auth/AuthGuard";
import Meta from "@/components/utils/Meta";

export type NextPageWithAttributes<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => JSX.Element;
  isPublic?: boolean;
  title?: string;
};

type AppPropsWithAttributes = AppProps & {
  Component: NextPageWithAttributes;
};

export default function App({ Component, pageProps }: AppPropsWithAttributes) {
  return (
    <>
      <Meta
        title={"Im Okay With Anything"}
        description="I hope this helps you"
        image="/hamburger.png"
      />
      <Provider>
        <AuthGuard Component={Component} pageProps={pageProps} />
      </Provider>
    </>
  );
}
