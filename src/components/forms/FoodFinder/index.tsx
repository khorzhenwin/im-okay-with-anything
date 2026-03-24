import Button from "@/components/buttons/Button";
import { initialFormProps, FormProps } from "@/utils/types/forms";
import { Box, Group, Modal, Text, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import ExternalConditionsSection from "./ExternalConditions";
import FoodPreferencesSection from "./FoodPreferences";
import useRecommendationStore from "@/stores/useRecommendationStore";
import { FaArrowRight } from "react-icons/fa";

const FoodFinder = ({ theme }: { theme: string }) => {
    const [recommendations, setRecommendations] = useRecommendationStore(useShallow((state) => [
        state.recommendations,
        state.setRecommendations,
    ]));
    const [errorMessage, setErrorMessage] = useState("");
    const [openModal, openModalHandlers] = useDisclosure(false);
    const [loadingAnimation, loadingAnimationHandlers] = useDisclosure(false);
    const initialGroupSize: number = 2;
    const form = useForm({ initialValues: initialFormProps });

    return (
        <>
            <Box pos="relative">
                <Modal
                    opened={openModal}
                    onClose={openModalHandlers.close}
                    size="lg"
                    radius="md"
                    withCloseButton={false}
                    centered
                    styles={{
                        content: { backgroundColor: "#1A1B1E" },
                        body: { padding: "20px" },
                    }}
                >
                    <Box p="md" pos="relative">
                        <Text mb="md" fw={700} size="lg" ta="center" c="white">
                            Here is a list of foods we can suggest you
                        </Text>
                        <LoadingOverlay visible={loadingAnimation} zIndex={1000} opacity={0.5} />
                        <Box c="white" mb="md">
                            {errorMessage ? (
                                <Text c="red.4" size="sm">
                                    {errorMessage}
                                </Text>
                            ) : null}
                            {recommendations.map((item, index) => (
                                <Box
                                    key={index}
                                    style={{ display: "flex", alignItems: "flex-start", marginBottom: "8px" }}
                                >
                                    <Box
                                        style={{
                                            minWidth: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            backgroundColor: "blue",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: "10px",
                                            marginTop: "2px",
                                        }}
                                    >
                                        <FaArrowRight style={{ width: "8px", height: "8px", color: "white" }} />
                                    </Box>
                                    <Text size="md" style={{ flex: 1 }}>
                                        {item}
                                    </Text>
                                </Box>
                            ))}
                        </Box>
                        <Group justify="flex-end" mt="xl" pt={8} onClick={regenerateValues}>
                            <Button color={theme}>Generate Again</Button>
                        </Group>
                    </Box>
                </Modal>
            </Box>

            <Box maw={"100%"} mx="auto">
                <form onSubmit={form.onSubmit((payload) => onSubmit(payload))}>
                    <section id="externalConditions" className="my-2">
                        <ExternalConditionsSection initialGroupSize={initialGroupSize} form={form} theme={theme} />
                    </section>
                    <section id="foodPreferences" className="my-2 mt-8">
                        <FoodPreferencesSection form={form} theme={theme} />
                    </section>
                    <Group justify="flex-end" mt="md">
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
        setErrorMessage("");
        setRecommendations([]);
        loadingAnimationHandlers.open();
        openModalHandlers.open();
        try {
            const response = await fetch("/api/food-finder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message ?? "Unable to generate recommendations.");
            }

            setRecommendations(data.recommendation ?? []);
        } catch (error) {
            console.error("food-finder request failed", error);
            setErrorMessage(error instanceof Error ? error.message : "Unable to generate recommendations.");
            setRecommendations([]);
        } finally {
            loadingAnimationHandlers.close();
            openModalHandlers.open();
        }
    }
};

export default FoodFinder;
