import { initialFormProps } from "@/utils/types/forms";
import { Checkbox, SimpleGrid } from "@mantine/core";

const Preferences = ({ form }: { form: any }) => {
  return (
    <div>
      <p className="text-sm">Preferences</p>
      <p className="text-justify text-xs text-gray-500">
        Please select your food preferences.
      </p>
      <SimpleGrid
        className="mt-4"
        cols={3}
        spacing="sm"
        breakpoints={[
          { maxWidth: "62rem", cols: 3 },
          { maxWidth: "48rem", cols: 2 },
          { maxWidth: "36rem", cols: 2 },
        ]}
      >
        {Object.keys(initialFormProps.preferences).map((key) => {
          return (
            <Checkbox
              key={key}
              label={initialFormProps.preferences[key].label}
              color="yellow"
              {...form.getInputProps(`preferences.${key}.value`, {
                type: "checkbox",
              })}
            />
          );
        })}
      </SimpleGrid>
    </div>
  );
};

export default Preferences;
