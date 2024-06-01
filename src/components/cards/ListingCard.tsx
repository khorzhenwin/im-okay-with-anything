import React, {useState, useMemo, useRef, useEffect} from 'react';
import TinderCard from 'react-tinder-card';
import {Card, Image, Text, Badge, Button, Group, Box, Stack} from '@mantine/core';
import {CardInterface} from "@/utils/types/card";

const ListingCard = ({theme, cardList}: { theme: string, cardList: CardInterface[] }) => {
    const [currentIndex, setCurrentIndex] = useState(cardList.length - 1);
    const [lastSwipedCard, setLastSwipedCard] = useState<CardInterface | null>(null);
    const currentIndexRef = useRef(currentIndex);

    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    const childRefs: any = useMemo(
        () => Array(cardList.length).fill(0).map(() => React.createRef()),
        [cardList.length]
    );

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const canGoBack = currentIndex < cardList.length - 1;
    const canSwipe = currentIndex >= 0;

    const onSwipe = (direction: string, id: string, index: number) => {
        setLastSwipedCard(cardList.find(card => card.id === id) || null);
        updateCurrentIndex(index - 1);
    };

    const outOfFrame = (name: string, idx: number) => {
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

    return (
        <Box pt={24}>
            <Box pos={"relative"} h={"18rem"}>
                {cardList.map((cardInfo: CardInterface, index) => (
                    <Box key={cardInfo.id} pos={"absolute"} w={"100%"}
                         style={{display: currentIndex >= index ? 'block' : 'none'}}>
                        <TinderCard
                            ref={childRefs[index]}
                            onSwipe={(dir) => onSwipe(dir, cardInfo.id, index)}
                            onCardLeftScreen={() => outOfFrame(cardInfo.restaurantName, index)}
                            preventSwipe={['up', 'down']}
                        >
                            <Card shadow="sm" padding="lg" radius="md" withBorder h={"18rem"}>
                                <Card.Section>
                                    <Image
                                        src={cardInfo.image ? cardInfo.image : 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
                                        height={160}
                                        alt={cardInfo.restaurantName}
                                    />
                                </Card.Section>

                                <Stack spacing={8} py={12}>
                                    <Text fw={600} className={"truncate"}>{cardInfo.restaurantName}</Text>
                                    {cardInfo.cuisine &&
                                        <Group grow>
                                            {cardInfo.cuisine.map((cuisineTag: string) => (
                                                <Badge color="teal" key={cuisineTag}>{cuisineTag}</Badge>
                                            ))}
                                        </Group>}
                                    {cardInfo.location && <Text size="sm" c="dimmed">{cardInfo.location}</Text>}
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
