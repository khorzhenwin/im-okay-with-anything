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
            <Box pos={"relative"} style={{ 
                height: '320px', 
                maxWidth: '500px', 
                margin: '0 auto',
                width: '100%'
            }}>
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
                            <Card p="md" radius="md" withBorder style={{ 
                                backgroundColor: '#2C2E33',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                height: '320px',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                {cardInfo.image && (
                                    <Box style={{ 
                                        width: '100%', 
                                        height: '160px', 
                                        overflow: 'hidden',
                                        borderRadius: '8px',
                                        marginBottom: '12px'
                                    }}>
                                        <Image 
                                            src={cardInfo.image} 
                                            alt={cardInfo.name}
                                            height={160}
                                            fit="cover"
                                            style={{ width: '100%' }}
                                        />
                                    </Box>
                                )}
                                
                                <Box style={{ flex: 1 }}>
                                    <Text fw={700} size="lg" className={"truncate"} c="white" mb="xs">
                                        {cardInfo.name}
                                    </Text>
                                    
                                    <Text size="sm" c="gray.4" mb="md" className={"truncate"}>
                                        {cardInfo.location}
                                    </Text>
                                    
                                    {cardInfo.cuisine && cardInfo.cuisine.trim() !== "" && (
                                        <Group style={{ flexWrap: 'wrap' }}>
                                            {getCuisines(cardInfo)}
                                        </Group>
                                    )}
                                </Box>
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
