import ListingDetails from "@/firebase/interfaces/listingDetails";
import { screamingSnakeToTitleCase } from "@/utils/helpers/string";
import { SwipeDirection } from "@/utils/types/card";
import { Badge, Box, Button, Card, Group, Image, Stack, Text } from "@mantine/core";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import useCurrentUserStore from "@/stores/useCurrentUserStore";

const ListingCard = ({
    theme,
    cardList,
    onSwipe = () => {},
}: {
    theme: string;
    cardList: ListingDetails[];
    onSwipe: (direction: SwipeDirection, id: string, index: number) => void;
}) => {
    const [currentIndex, setCurrentIndex] = useState(cardList.length - 1);
    const [lastSwipedCard, setLastSwipedCard] = useState<ListingDetails | null>(null);
    const [setHasFinishedVoting] = useCurrentUserStore((state) => [state.setHasFinishedVoting]);
    const currentIndexRef = useRef(currentIndex);

    useEffect(() => {
        setCurrentIndex(cardList.length - 1);
        currentIndexRef.current = cardList.length - 1;
    }, [cardList]);

    const childRefs: any = useMemo(
        () =>
            Array(cardList.length)
                .fill(0)
                .map(() => React.createRef()),
        [cardList.length],
    );

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;

        if (val < 0) setHasFinishedVoting(true);
    };

    const canSwipe = currentIndex >= 0;

    const handleSwipe = (direction: string, id: string, index: number) => {
        setLastSwipedCard(cardList.find((card) => card.id === id) || null);
        updateCurrentIndex(index - 1);
        onSwipe(direction as SwipeDirection, id, index);
    };

    const outOfFrame = (idx: number) => {
        if (currentIndexRef.current >= idx) {
            childRefs[idx].current.restoreCard();
        }
    };

    const swipe = async (dir: string) => {
        if (canSwipe && currentIndex < cardList.length && childRefs[currentIndex].current) {
            await childRefs[currentIndex].current.swipe(dir);
        }
    };

    const getCuisines = (info: ListingDetails) => {
        if (info.cuisine == null || info.cuisine.trim() == "") return null;

        return info.cuisine.split(";").map((c) => (
            <Badge color="teal" key={c} radius={"sm"}>
                {screamingSnakeToTitleCase(c)}
            </Badge>
        ));
    };

    return (
        <Box pt={24}>
            <Box pos={"relative"} h={"12rem"}>
                {cardList.map((cardInfo: ListingDetails, index) => (
                    <Box
                        key={cardInfo.id}
                        pos={"absolute"}
                        w={"100%"}
                        style={{ display: currentIndex >= index ? "block" : "none" }}
                    >
                        <TinderCard
                            ref={childRefs[index]}
                            onSwipe={(dir) => handleSwipe(dir, cardInfo.id, index)}
                            onCardLeftScreen={() => outOfFrame(index)}
                            preventSwipe={["up", "down"]}
                        >
                            <Card padding="lg" radius="md" withBorder h={"12rem"}>
                                <Stack spacing={8} py={8}>
                                    <Text fw={600} className={"truncate"}>
                                        {cardInfo.name}
                                    </Text>
                                    <Group>{getCuisines(cardInfo)}</Group>
                                    <Text size="sm" c="dimmed">
                                        {cardInfo.location}
                                    </Text>
                                </Stack>
                            </Card>
                        </TinderCard>
                    </Box>
                ))}
            </Box>

            <Group grow my="xs">
                <Button color={theme} fullWidth mt="md" radius="md" onClick={() => swipe("left")}>
                    👎🏻
                </Button>
                <Button color={theme} fullWidth mt="md" radius="md" onClick={() => swipe("right")}>
                    👍🏻
                </Button>
            </Group>
        </Box>
    );
};

export default ListingCard;
