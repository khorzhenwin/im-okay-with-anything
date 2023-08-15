import Button from "@/components/buttons/Button";
import { FormProps, initialFormProps } from "@/utils/types/forms";
import { Box, Checkbox, Group, Slider, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import ExternalConditionsSection from "./ExternalConditions";
import FoodPreferencesSection from "./FoodPreferences";

const FoodFinder = ({ theme }: { theme: string }) => {
  const initialGroupSize: number = 2;
  const form = useForm({ initialValues: initialFormProps });

  return (
    <Box maw={"100%"} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <section id="externalConditions" className="my-2">
          <ExternalConditionsSection
            initialGroupSize={initialGroupSize}
            form={form}
            theme={theme}
          />
        </section>
        <section id="foodPreferences" className="my-2 mt-8">
          <FoodPreferencesSection form={form} theme={theme} />
        </section>
        <Group position="right" mt="md">
          <Button type="submit" color={theme}>
            SUBMIT
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default FoodFinder;
