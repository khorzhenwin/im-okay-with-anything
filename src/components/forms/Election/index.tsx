import LocationInput from "@/components/input/LocationInput";
import {Group} from "@mantine/core";
import Button from "@/components/buttons/Button";

const Election = ({theme}: { theme: string }) => {

    return <>
        <LocationInput theme={theme}/>
        <Group position="right" mt="md" pt={8}>
            <Button color={theme}>
                Start Voting!
            </Button>
        </Group>
    </>
};

export default Election;