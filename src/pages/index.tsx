import Image from "next/image";
import { NextPageWithAttributes } from "./_app";
import { Tabs } from "@mantine/core";
import { useState } from "react";
import { IconDog, IconRobotOff } from "@tabler/icons-react";
import DefaultForm from "@/components/forms/DefaultForm";
import NiceLink from "@/components/links/NiceLink";
import useSession from "@/features/Auth/hooks/useSession";

const Home: NextPageWithAttributes = () => {
  const [activeTab, setActiveTab] = useState<string | null>("chowhound");
  return (
    <div className="flex min-h-screen w-full flex-col items-stretch">
      <h3 className="pb-2 text-2xl font-semibold text-white md:text-3xl">
        {`I'm Okay With Anything`}
      </h3>
      <p className="pb-4 text-justify text-xs text-gray-500">
        The age old response whenever you ask your friends what to eat
      </p>
      <Tabs
        defaultValue="overview"
        color="yellow"
        keepMounted={false}
        value={activeTab}
        onTabChange={setActiveTab}
      >
        <Tabs.List>
          <Tabs.Tab value="chowhound" icon={<IconDog size="0.8rem" />}>
            Chowhound
          </Tabs.Tab>
          <Tabs.Tab value="eliminator" icon={<IconRobotOff size="0.8rem" />}>
            Eliminator
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="chowhound" pt="sm">
          <DefaultForm />
        </Tabs.Panel>

        <Tabs.Panel value="eliminator" pt="sm">
          Process of Elimination
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

Home.isPublic = true;
Home.title = "Home";

export default Home;
