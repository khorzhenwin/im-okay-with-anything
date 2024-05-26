import Button from "@/components/buttons/Button";
import {initialFormProps, FormProps} from "@/utils/types/forms";
import {Box, Group, Modal, Text, List, LoadingOverlay, ThemeIcon, rem} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useDisclosure} from '@mantine/hooks';
import ExternalConditionsSection from "./ExternalConditions";
import FoodPreferencesSection from "./FoodPreferences";
import useRecommendationStore from "@/stores/useRecommendationStore";
import {FaArrowRight} from "react-icons/fa";

const FoodFinder = ({theme}: { theme: string }) => {
    const [recommendations, setRecommendations] = useRecommendationStore((state) => [state.recommendations, state.setRecommendations]);
    const [openModal, openModalHandlers] = useDisclosure(false);
    const [loadingAnimation, loadingAnimationHandlers] = useDisclosure(false);
    const initialGroupSize: number = 2;
    const form = useForm({initialValues: initialFormProps});

    return (
        <>
            <Box pos="relative">
                <Modal opened={openModal} onClose={openModalHandlers.close} size="auto" h={"100%"} radius={"md"} withCloseButton={false}>
                    <Box p={12}>
                        <Text mb={8} fw={700} size={"lg"} align={"center"}>Here is a list of foods we can suggest you</Text>
                        <LoadingOverlay visible={loadingAnimation} zIndex={1000} overlayBlur={0} overlayOpacity={0.5}/>
                        <List withPadding>
                            {recommendations.map((recommendation, index) => (
                                <List.Item key={index}
                                           icon={
                                               <ThemeIcon color="blue" size={16} radius="xl">
                                                   <FaArrowRight style={{width: rem(8), height: rem(8)}}/>
                                               </ThemeIcon>
                                           }>
                                    {recommendation}
                                </List.Item>
                            ))}
                        </List>
                        <Group position="right" mt="md" pt={8} onClick={regenerateValues}>
                            <Button color={theme}>
                                Generate Again
                            </Button>
                        </Group>
                    </Box>
                </Modal>
            </Box>

            <Box maw={"100%"} mx="auto">
                <form onSubmit={form.onSubmit((payload) => onSubmit(payload))}>
                    <section id="externalConditions" className="my-2">
                        <ExternalConditionsSection
                            initialGroupSize={initialGroupSize}
                            form={form}
                            theme={theme}
                        />
                    </section>
                    <section id="foodPreferences" className="my-2 mt-8">
                        <FoodPreferencesSection form={form} theme={theme}/>
                    </section>
                    <Group position="right" mt="md">
                        <Button type="submit" color={theme}>
                            SUBMIT
                        </Button>
                    </Group>
                </form>
            </Box>
        </>
    );

    async function regenerateValues() {
        try {
            await onSubmit(form.values);
        } catch (error) {
            console.error(error);
        }
    }

    async function onSubmit(values: FormProps) {
        setRecommendations([]);
        loadingAnimationHandlers.open();
        openModalHandlers.open();
        await fetch("/api/food-finder", {
            method: "POST",
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => setRecommendations(data.recommendation))
            .then(() => {
                loadingAnimationHandlers.close();
                openModalHandlers.open();
            });
    }
};

export default FoodFinder;
