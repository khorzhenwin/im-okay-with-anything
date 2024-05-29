import FoodFinder from "@/components/forms/FoodFinder";
import Election from "@/components/forms/Election";
import {Tabs} from "@mantine/core";
import {IconDog, IconRobotOff} from "@tabler/icons-react";
import {useState} from "react";
import {NextPageWithAttributes} from "./_app";

const Home: NextPageWithAttributes = () => {
    const theme = "violet";
    const [activeTab, setActiveTab] = useState<string | null>("foodfinder");
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
                color={theme}
                keepMounted={false}
                value={activeTab}
                onTabChange={setActiveTab}
            >
                <Tabs.List>
                    <Tabs.Tab value="foodfinder" icon={<IconDog size="0.8rem"/>}>
                        FoodFinder
                    </Tabs.Tab>
                    <Tabs.Tab value="election" icon={<IconRobotOff size="0.8rem"/>}>
                        Election
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="foodfinder" pt="sm">
                    <FoodFinder theme={theme}/>
                </Tabs.Panel>

                <Tabs.Panel value="election" pt="sm">
                    <Election theme={theme}/>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};

Home.isPublic = true;
Home.title = "Home";

export default Home;
