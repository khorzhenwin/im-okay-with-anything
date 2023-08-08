import Image from "next/image";
import { NextPageWithAttributes } from "./_app";
import NiceLink from "@/components/links/NiceLink";
import useSession from "@/features/Auth/hooks/useSession";

const Home: NextPageWithAttributes = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-stretch">
      <h3 className="text-lg font-semibold text-white md:text-3xl">
        So you have decided to go down the path of darkness
      </h3>
    </div>
  );
};

Home.isPublic = true;
export default Home;
