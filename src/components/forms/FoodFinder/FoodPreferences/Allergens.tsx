import {Checkbox, CheckboxProps, SimpleGrid} from "@mantine/core";
import {Allergens, initialFormProps} from "@/utils/types/forms";

const AllergensSection = ({form, theme}: { form: any; theme: string }) => {
    return (
        <div>
            <p className="text-sm">Allergens</p>
            <p className="text-justify text-xs text-gray-500">
                Please select any allergens that you have.
            </p>
            <SimpleGrid
                className="mt-4"
                cols={{ base: 2, sm: 2, md: 3, lg: 3 }}
                spacing="sm"
            >
                {Object.keys(initialFormProps.allergens).map((key: string) => {
                    return (
                        <Checkbox
                            key={key}
                            label={initialFormProps.allergens[key as keyof Allergens].label}
                            color={theme}
                            {...form.getInputProps(`allergens.${key}.value`, {
                                type: "checkbox",
                            })}
                        />
                    );
                })}
            </SimpleGrid>
        </div>
    );
};

export default AllergensSection;
