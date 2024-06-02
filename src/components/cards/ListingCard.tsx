import { screamingSnakeToTitleCase } from "@/utils/helpers/string";
import { Feature } from "@/utils/types/restaurant-finder";
import { Badge, Box, Button, Card, Group, Image, Stack, Text } from "@mantine/core";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TinderCard from "react-tinder-card";

const ListingCard = ({ theme, cardList }: { theme: string; cardList: Feature[] }) => {
    const [currentIndex, setCurrentIndex] = useState(cardList.length - 1);
    const [lastSwipedCard, setLastSwipedCard] = useState<Feature | null>(null);
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
        console.log(cardList[val]);
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const canGoBack = currentIndex < cardList.length - 1;
    const canSwipe = currentIndex >= 0;

    const onSwipe = (direction: string, id: string, index: number) => {
        setLastSwipedCard(cardList.find((card) => card.properties.place_id === id) || null);
        updateCurrentIndex(index - 1);
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

    const undoLastSwipe = async () => {
        if (canGoBack && childRefs[currentIndex + 1].current) {
            const newIndex = currentIndex + 1;
            updateCurrentIndex(newIndex);
            await childRefs[newIndex].current.restoreCard();
        }
    };

    const getCuisines = (info: Feature) => {
        if (info.properties.catering?.cuisine == null) return null;

        return info.properties.catering?.cuisine.split(";").map((c) => (
            <Badge color="teal" key={c}>
                {screamingSnakeToTitleCase(c)}
            </Badge>
        ));
    };

    return (
        <Box pt={24}>
            <Box pos={"relative"} h={"18rem"}>
                {cardList.map((cardInfo: Feature, index) => (
                    <Box
                        key={cardInfo.properties.place_id}
                        pos={"absolute"}
                        w={"100%"}
                        style={{ display: currentIndex >= index ? "block" : "none" }}
                    >
                        <TinderCard
                            ref={childRefs[index]}
                            onSwipe={(dir) => onSwipe(dir, cardInfo.properties.place_id, index)}
                            onCardLeftScreen={() => outOfFrame(index)}
                            preventSwipe={["up", "down"]}
                        >
                            <Card shadow="sm" padding="lg" radius="md" withBorder h={"18rem"}>
                                <Card.Section>
                                    <Image
                                        src={
                                            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                                        }
                                        height={160}
                                        alt={cardInfo.properties.name}
                                    />
                                </Card.Section>

                                <Stack spacing={8} py={12}>
                                    <Text fw={600} className={"truncate"}>
                                        {cardInfo.properties.name_international?.en ?? cardInfo.properties.name}
                                    </Text>
                                    <Group>{getCuisines(cardInfo)}</Group>
                                    <Text size="sm" c="dimmed">
                                        {cardInfo.properties.formatted}
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
                <Button color={theme} fullWidth mt="md" radius="md" onClick={undoLastSwipe}>
                    Undo
                </Button>
                <Button color={theme} fullWidth mt="md" radius="md" onClick={() => swipe("right")}>
                    👍🏻
                </Button>
            </Group>
        </Box>
    );
};

export default ListingCard;
