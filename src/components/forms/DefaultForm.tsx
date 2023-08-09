import { TextInput, Checkbox, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import Button from "@/components/buttons/Button";

type FormProps = {
  email?: string;
  isRaining?: boolean;
  isSpicy?: boolean;
  isDairy?: boolean;
};

const DefaultForm = ({ email, isRaining }: FormProps) => {
  const form = useForm({
    initialValues: {
      email: "",
      isRaining: false,
      isSpicy: true,
      isDairy: true,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <Checkbox
          mt="md"
          label="Raining"
          {...form.getInputProps("isRaining", { type: "checkbox" })}
        />
        <Checkbox
          mt="md"
          label="Can Take Spicy Food"
          {...form.getInputProps("isSpicy", { type: "checkbox" })}
        />
        <Checkbox
          mt="md"
          label="Can Take Dairy"
          {...form.getInputProps("isDairy", { type: "checkbox" })}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default DefaultForm;
