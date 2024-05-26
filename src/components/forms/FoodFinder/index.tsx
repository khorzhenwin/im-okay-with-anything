import Button from "@/components/buttons/Button";
import {initialFormProps, FormProps} from "@/utils/types/forms";
import {Box, Group, Modal, Text, List, LoadingOverlay} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useDisclosure} from '@mantine/hooks';
import ExternalConditionsSection from "./ExternalConditions";
import FoodPreferencesSection from "./FoodPreferences";
import useRecommendationStore from "@/stores/useRecommendationStore";

const FoodFinder = ({theme}: { theme: string }) => {
    const [recommendations, setRecommendations] = useRecommendationStore((state) => [state.recommendations, state.setRecommendations]);
    const [openModal, openModalHandlers] = useDisclosure(false);
    const [loadingAnimation, loadingAnimationHandlers] = useDisclosure(false);
    const initialGroupSize: number = 2;
    const form = useForm({initialValues: initialFormProps});

    return (
        <>
            <Box pos="relative">
                <Modal opened={openModal} onClose={openModalHandlers.close} size="auto" title="What we found" h={"100%"}>
                    <Text mb={12}>Here is a list of foods we can suggest you</Text>
                    <LoadingOverlay visible={loadingAnimation} zIndex={1000} overlayBlur={0} overlayOpacity={0.5}/>

                    <List withPadding>
                        {recommendations.map((recommendation, index) => (
                            <List.Item key={index}>
                                {recommendation}
                            </List.Item>
                        ))}
                    </List>
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
