import { TextInput, rem } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

const LocationInput = ({theme}: { theme: string }) => {
    const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;

    return <>
        <TextInput
            mt="md"
            rightSectionProps={{ style: { cursor: 'pointer' } }}
            rightSection={icon}
            label="Your email"
            placeholder="Your email"
        />
    </>
};

export default LocationInput;