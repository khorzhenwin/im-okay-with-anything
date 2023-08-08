import Navbar from "@/components/nav/Navbar";
import { ReactElement, ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="flex flex-row justify-center bg-gradient-to-b from-slate-900 to-slate-700">
      {/* <Navbar /> */}
      <main className="max-w-6xl flex-1 px-8 py-12">{children}</main>
    </div>
  );
};

export default function getDefaultLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
}
