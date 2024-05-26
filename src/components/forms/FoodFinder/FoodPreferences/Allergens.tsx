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
                cols={3}
                spacing="sm"
                breakpoints={[
                    {maxWidth: "62rem", cols: 3},
                    {maxWidth: "48rem", cols: 2},
                    {maxWidth: "36rem", cols: 2},
                ]}
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
