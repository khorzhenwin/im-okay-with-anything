import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ExternalConditions, initialFormProps } from "@/utils/types/forms";

interface FormState {
  externalConditions: ExternalConditions;
  allergens: string[];
  preferences: string[];
  setFormState: (formState: FormState) => void;
}

const useFormStore = create<FormState>()(
  devtools(
    persist(
      (set) => ({
        externalConditions: initialFormProps.externalConditions,
        allergens: [],
        preferences: [],
        setFormState: (formState) => set(() => ({ ...formState })),
      }),
      {
        name: "form-storage",
      }
    )
  )
);

export default useFormStore;
