import LocationInput from "@/components/input/LocationInput";
import ExternalConditionsSection from "@/components/forms/FoodFinder/ExternalConditions";
import {useForm} from "@mantine/form";
import {initialFormProps} from "@/utils/types/forms";
import {Box} from "@mantine/core";

const Election = ({theme}: { theme: string }) => {
    const initialGroupSize: number = 2;
    const form = useForm({initialValues: initialFormProps});

    return <>
        <ExternalConditionsSection
            initialGroupSize={initialGroupSize}
            form={form}
            theme={theme}
        />
        <LocationInput theme={theme}/>
    </>
};

export default Election;