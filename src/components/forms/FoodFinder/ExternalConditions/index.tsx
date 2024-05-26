import {Checkbox, Slider, Text, SimpleGrid, CheckboxProps} from "@mantine/core";
import { useState } from "react";
import { initialFormProps } from "@/utils/types/forms";
import { ExternalConditions } from "@/utils/types/forms";

const ExternalConditionsSection = ({
  initialGroupSize,
  form,
  theme,
}: {
  initialGroupSize: number;
  form: any;
  theme: string;
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
          color={theme}
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
        {Object.keys(initialFormProps.externalConditions).map((key: string) => {
          if (key === "groupSize") return null;
          const condition : CheckboxProps = initialFormProps.externalConditions[key as keyof ExternalConditions] as CheckboxProps;
          return (
            <Checkbox
              key={key}
              label={condition.label}
              color={theme}
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
