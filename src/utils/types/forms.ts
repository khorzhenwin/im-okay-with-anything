interface CheckboxProps {
  label: string;
  value: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormProps {
  externalConditions: ExternalConditions;
  allergens: Allergens;
  preferences: Preferences;
}

export interface ExternalConditions {
  groupSize: number;
  isRaining: CheckboxProps;
  isHalal: CheckboxProps;
  isVegetarian: CheckboxProps;
}

export interface Allergens {
  isDairy: CheckboxProps;
  isNut: CheckboxProps;
  isShellfish: CheckboxProps;
  isSeafood: CheckboxProps;
}

export interface Preferences {
  isSpicy: CheckboxProps;
  hasFried: CheckboxProps;
  hasSteamed: CheckboxProps;
  hasSoup: CheckboxProps;
  hasRice: CheckboxProps;
  hasNoodles: CheckboxProps;
  hasPasta: CheckboxProps;
  hasMeat: CheckboxProps;
  hasEggs: CheckboxProps;
  hasVegetables: CheckboxProps;
}

export const initialFormProps: FormProps | any = {
  externalConditions: {
    groupSize: 2,
    isRaining: { label: "Currently Raining", value: false },
    isHalal: { label: "Halal", value: false },
    isVegetarian: { label: "Vegetarian", value: false },
  },
  allergens: {
    isDairy: { label: "Dairy", value: false },
    isNut: { label: "Nuts", value: false },
    isShellfish: { label: "Shellfish", value: false },
    isSeafood: { label: "Seafood", value: false },
  },
  preferences: {
    isSpicy: { label: "Spicy", value: false },
    hasFried: { label: "Fried", value: false },
    hasSteamed: { label: "Steamed", value: false },
    hasSoup: { label: "Soup", value: false },
    hasRice: { label: "Rice", value: false },
    hasNoodles: { label: "Noodles", value: false },
    hasPasta: { label: "Pasta", value: false },
    hasMeat: { label: "Meat", value: false },
    hasEggs: { label: "Eggs", value: false },
    hasVegetables: { label: "Vegetables", value: false },
  },
};
