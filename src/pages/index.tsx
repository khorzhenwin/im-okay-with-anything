import SimpleTabs from "@/components/utils/SimpleTabs";
import {NextPageWithAttributes} from "./_app";

const Home: NextPageWithAttributes = () => {
    const theme = "violet";
    return (
        <div className="flex min-h-screen w-full flex-col items-stretch overflow-hidden">
            <h3 className="pb-2 text-2xl font-semibold text-white md:text-3xl">
                {`I'm Okay With Anything`}
            </h3>
            <p className="pb-4 text-justify text-xs text-gray-500">
                The age old response whenever you ask your friends what to eat
            </p>
            <SimpleTabs theme={theme} />
        </div>
    );
};

Home.isPublic = true;
Home.title = "Home";

export default Home;
