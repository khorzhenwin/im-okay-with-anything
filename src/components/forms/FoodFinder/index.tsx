import Button from "@/components/buttons/Button";
import { initialFormProps, FormProps } from "@/utils/types/forms";
import { Box, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import ExternalConditionsSection from "./ExternalConditions";
import FoodPreferencesSection from "./FoodPreferences";

async function onSubmit(values: FormProps) {
  await fetch("/api/food-finder", {
    method: "POST",
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

const FoodFinder = ({ theme }: { theme: string }) => {
  const initialGroupSize: number = 2;
  const form = useForm({ initialValues: initialFormProps });

  return (
    <Box maw={"100%"} mx="auto">
      <form onSubmit={form.onSubmit((payload) => onSubmit(payload))}>
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
