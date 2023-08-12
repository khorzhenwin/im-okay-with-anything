export interface FormProps {
  externalConditions?: ExternalConditions;
  allergens?: Allergens;
  preferences?: Preferences;
}

export interface ExternalConditions {
  groupSize: number;
  isRaining: boolean;
}

export interface Allergens {
  isDairy: boolean;
}

export interface Preferences {
  isSpicy: boolean;
}

export const initialFormProps: FormProps = {
  externalConditions: {
    groupSize: 2,
    isRaining: false,
  },
  allergens: {
    isDairy: false,
  },
  preferences: {
    isSpicy: true,
  },
};
