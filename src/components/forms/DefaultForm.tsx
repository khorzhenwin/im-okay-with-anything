import { TextInput, Checkbox, Group, Box, Slider, Text } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import Button from "@/components/buttons/Button";
import {
  FormProps,
  ExternalConditions,
  Allergens,
  Preferences,
  initialFormProps,
} from "@/utils/types/forms";

const DefaultForm = ({
  externalConditions,
  allergens,
  preferences,
}: FormProps) => {
  const initialGroupSize: number = 2;
  const [groupSizeValue, setGroupSizeValue] = useState(initialGroupSize);
  const form = useForm({ initialValues: initialFormProps });

  return (
    <Box maw={"100%"} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <section id="externalConditions" className="my-2">
          <h3 className="pb-4 text-xl font-semibold ">External Conditions</h3>
          <div className="my-2 font-medium text-gray-300">
            <Text pb={2} size={"sm"}>
              Group Size : {groupSizeValue}
            </Text>
            <Slider
              color="yellow"
              value={groupSizeValue}
              onChange={(value) => {
                setGroupSizeValue(value);
                form.setFieldValue("externalConditions.groupSize", value);
              }}
              labelTransition="skew-down"
              labelTransitionDuration={150}
              labelTransitionTimingFunction="ease"
            />
          </div>
          <Checkbox
            my="sm"
            label={"Currently Raining ?"}
            color="yellow"
            {...form.getInputProps("externalConditions.isRaining", {
              type: "checkbox",
            })}
          />
        </section>
        <section id="foodPreferences" className="my-2 mt-8">
          <h3 className="pb-4 text-xl font-semibold ">Food Preferences</h3>
          <section id="allergens" className="pb-2">
            <Text size={"sm"}>Allergens</Text>
            <p className="text-justify text-xs text-gray-500">
              Please select any allergens that you have.
            </p>
            <Checkbox
              my="sm"
              label={"Dairy"}
              color="yellow"
              {...form.getInputProps("preferences.isDairy", {
                type: "checkbox",
              })}
            />
          </section>
          <section id="preferences">
            <Text size={"sm"}>Preferences</Text>
            <p className="text-justify text-xs text-gray-500">
              Please select your food preferences.
            </p>
            <Checkbox
              my="sm"
              label={"Spicy"}
              color="yellow"
              {...form.getInputProps("preferences.isSpicy", {
                type: "checkbox",
              })}
            />
          </section>
        </section>
        <Group position="right" mt="md">
          <Button type="submit">SUBMIT</Button>
        </Group>
      </form>
    </Box>
  );
};

export default DefaultForm;
