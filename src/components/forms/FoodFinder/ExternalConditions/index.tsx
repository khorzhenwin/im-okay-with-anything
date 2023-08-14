import { Checkbox, Slider, Text, SimpleGrid } from "@mantine/core";
import { useState } from "react";
import { initialFormProps } from "@/utils/types/forms";

const ExternalConditionsSection = ({
  initialGroupSize,
  form,
}: {
  initialGroupSize: number;
  form: any;
}) => {
  const [groupSizeValue, setGroupSizeValue] = useState(initialGroupSize);

  return (
    <div>
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
        {Object.keys(initialFormProps.externalConditions).map((key) => {
          if (key === "groupSize") return null;
          return (
            <Checkbox
              key={key}
              label={initialFormProps.externalConditions[key].label}
              color="yellow"
              {...form.getInputProps(`externalConditions.${key}.value`, {
                type: "checkbox",
              })}
            />
          );
        })}
      </SimpleGrid>
    </div>
  );
};

export default ExternalConditionsSection;
