import {initialFormProps, Preferences} from "@/utils/types/forms";
import { Checkbox, SimpleGrid } from "@mantine/core";

const PreferencesSection = ({ form, theme }: { form: any; theme: string }) => {
  return (
    <div>
      <p className="text-sm">Preferences</p>
      <p className="text-justify text-xs text-gray-500">
        Please select your food preferences.
      </p>
      <SimpleGrid
        className="mt-4"
        cols={{ base: 2, sm: 2, md: 3, lg: 3 }}
        spacing="sm"
      >
        {Object.keys(initialFormProps.preferences).map((key) => {
          return (
            <Checkbox
              key={key}
              label={initialFormProps.preferences[key as keyof Preferences].label}
              color={theme}
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

export default PreferencesSection;
