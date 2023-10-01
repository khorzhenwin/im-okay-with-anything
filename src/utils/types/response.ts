type FoodOptionProperties = {
  minGroupSize: number;
  maxGroupSize: number;
  isHalal: boolean;
  isVegetarian: boolean;
  allergens: string[];
  preferences: string[];
};

type FoodOption = {
  [key: string]: FoodOptionProperties;
};

export type FoodFinderProps = {
  [key: string]: FoodOption;
};
