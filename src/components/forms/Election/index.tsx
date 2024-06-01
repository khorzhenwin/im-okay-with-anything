import LocationInput from "@/components/input/LocationInput";
import {Group} from "@mantine/core";
import Button from "@/components/buttons/Button";
import ListingCard from "@/components/cards/ListingCard";
import {CardInterface} from "@/utils/types/card";

const foodList: CardInterface[] = [
    {
        id: "1",
        restaurantName: "KFC",
        location: "Kuala Lumpur",
        image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
        cuisine: ["Fast Food"]
    },
    {
        id: "2",
        restaurantName: "McDonald's",
        location: "Kuala Lumpur",
    },
    {
        id: "3",
        restaurantName: "Burger King Kongek Besar Jahanam",
        image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
        cuisine: ["King Kong", "Fast Food"]
    },
    {
        id: "4",
        restaurantName: "Subweiweiweiweiweiweiweiweiweiweiweiweiweiwei",
        location: "Kuala Lumpur",
        image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
        cuisine: ["Sandwiches"]
    },
    {
        id: "5",
        restaurantName: "Texas Chicken",
        location: "Kuala Lumpur",
        image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
        cuisine: ["Down south"]
    }
];

const Election = ({theme}: { theme: string }) => {

    return <>
        <LocationInput theme={theme}/>
        <Group position="right" mt="md" pt={8}>
            <Button color={theme}>
                Start Voting!
            </Button>
        </Group>
        <ListingCard theme={theme} cardList={foodList}/>
    </>
};

export default Election;