import {TextInput, rem, Group, LoadingOverlay, Box, Text} from '@mantine/core';
import {IconMapPin} from '@tabler/icons-react';
import Button from "@/components/buttons/Button";
import useLocationStore from "@/stores/useLocationStore";
import "dotenv/config";
import {ChangeEvent} from "react";
import {getUserIp} from "@/utils/helpers/location";
import {useDisclosure} from "@mantine/hooks";

const LocationInput = ({theme}: { theme: string }) => {
    const [loadingAnimation, loadingAnimationHandlers] = useDisclosure(false);
    const [locationName, setLocationName] = useLocationStore((state) => [state.locationName, state.setLocationName]);
    const getUserLocation = async () => {
        loadingAnimationHandlers.open();
        const userIp = await getUserIp();
        await fetch(`/api/user-location?userIp=${userIp}`, {method: "GET"})
            .then((res) => res.json())
            .then((data) => setLocationName(data.locationName))
            .catch((error) => console.error(error));
        loadingAnimationHandlers.close();
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocationName(event.currentTarget.value); // Update the global state
    }
    const icon = <IconMapPin style={{width: rem(16), height: rem(16)}} onClick={getUserLocation}/>;

    return <>
        <Box mt={"xl"}>
            <Text size={"md"}>Enter Your Location</Text>
            <Box pos="relative">
                <LoadingOverlay visible={loadingAnimation} zIndex={1000} overlayBlur={0} overlayOpacity={0.5}/>
                <TextInput
                    mt={"sm"}
                    rightSectionProps={{style: {cursor: 'pointer'}}}
                    rightSection={icon}
                    placeholder="Click on the icon to get your location!"
                    value={locationName}
                    onChange={handleInputChange}
                />
            </Box>
            <Group position="right" mt="md" pt={8}>
                <Button color={theme}>
                    Start Voting!
                </Button>
            </Group>
        </Box>
    </>
};


export default LocationInput;