import { MantineModal } from "@/utils/modals/types";
import ModalLayout from "./ModalLayout";

export interface HelloWorldModalProps {
  name: string;
}

const HelloWorldModal: MantineModal<HelloWorldModalProps> = ({
  innerProps: { name },
}) => {
  return <ModalLayout title="Hello World">Hello {name}</ModalLayout>;
};

HelloWorldModal.properties = {
  styles: { close: { '&:hover': { backgroundColor: '#e5e7eb' } } },
};

export default HelloWorldModal;
