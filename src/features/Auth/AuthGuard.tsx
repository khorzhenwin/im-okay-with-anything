import { NextPageWithAttributes } from "@/pages/_app";
import getDefaultLayout from "@/layouts/BaseLayout";
import { useEffect } from "react";
import useSession from "@/features/Auth/hooks/useSession";
import { useRouter } from "next/router";
import SplashScreen from "@/components/utils/SplashScreen";
import { notifications } from "@mantine/notifications";

interface AuthGuardProps {
  Component: NextPageWithAttributes;
  pageProps: any;
}

const AuthGuard = ({ Component, pageProps }: AuthGuardProps) => {
  const session = useSession();
  const router = useRouter();

  const getLayout = Component.getLayout || getDefaultLayout;
  const isPublic = Boolean(Component.isPublic);
  const isAuthenticated = isPublic || session.status === "authenticated";

  useEffect(() => {
    if (!isAuthenticated && session.status !== "loading") {
      notifications.show({
        message: "You are unauthenticated",
        color: "red",
      });
      router.push("/");
    }
  }, [isAuthenticated, router, session.status]);

  if (session.status === "loading" && !isPublic) {
    return <SplashScreen />;
  }

  return <>{getLayout(<Component {...pageProps} />)}</>;
};

export default AuthGuard;
