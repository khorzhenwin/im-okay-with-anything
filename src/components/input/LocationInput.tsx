import {TextInput, rem, Group} from '@mantine/core';
import {IconMapPin} from '@tabler/icons-react';
import Button from "@/components/buttons/Button";
import useLocationStore from "@/stores/useLocationStore";
import "dotenv/config";
import {ChangeEvent} from "react";

const LocationInput = ({theme}: { theme: string }) => {
    const [locationName, setLocationName] = useLocationStore((state) => [state.locationName, state.setLocationName]);
    const getUserLocation = async () => {
        await fetch("/api/user-location", {method: "GET",})
            .then((res) => res.json())
            .then((data) => setLocationName(data.locationName))
            .catch((error) => console.error(error));
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocationName(event.currentTarget.value); // Update the global state
    }
    const icon = <IconMapPin style={{width: rem(16), height: rem(16)}} onClick={getUserLocation}/>;

    return <>
        <TextInput
            mt={"xl"}
            rightSectionProps={{style: {cursor: 'pointer'}}}
            rightSection={icon}
            label="Enter Location"
            placeholder="Click on the icon to get your location!"
            value={locationName}
            onChange={handleInputChange}
        />
        <Group position="right" mt="md" pt={8}>
            <Button color={theme}>
                Start Voting!
            </Button>
        </Group>
    </>
};


export default LocationInput;