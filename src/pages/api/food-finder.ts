import { FormProps, ExternalConditions } from "@/utils/types/forms";
import { FoodFinderProps } from "@/utils/types/response";
import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_RESPONSES } from "@/utils/errors/default";
import recommendationsData from "@/utils/data/recommendations.json";

const recommendations: FoodFinderProps = recommendationsData as FoodFinderProps;

interface FormRequest extends NextApiRequest {
  body: FormProps;
}

const handler = (
  req: FormRequest,
  res: NextApiResponse<{ message: string }>
) => {
  if (req.method !== "POST") {
    res
      .status(DEFAULT_RESPONSES.FORBIDDEN.status)
      .json({ message: DEFAULT_RESPONSES.FORBIDDEN.message });
  }

  const data: FormProps = JSON.parse(req.body as unknown as string);
  if (!data) {
    res
      .status(DEFAULT_RESPONSES.BAD_REQUEST.status)
      .json({ message: DEFAULT_RESPONSES.BAD_REQUEST.message });
  }

  const allergens: string[] = [];
  const preferences: string[] = [];

  for (const allergy in data.allergens) {
    if (data.allergens[allergy as keyof typeof data.allergens].value) {
      allergens.push(
        data.allergens[allergy as keyof typeof data.allergens].label
      );
    }
  }

  for (const preference in data.preferences) {
    if (data.preferences[preference as keyof typeof data.preferences].value) {
      preferences.push(
        data.preferences[preference as keyof typeof data.preferences].label
      );
    }
  }

  let response = {
    externalConditions: data.externalConditions,
    allergens,
    preferences,
    recommendations: {},
  };

  // food groups (Chinese, Indian, etc)
  for (const cuisine in recommendations) {
    // food options (Dim Sum, Pizza, etc)
    for (const foodOption in recommendations[cuisine]) {
      // check if recommendations[cuisine] has allergens
      const allergiesPresent = allergens.filter(
        (allergy) =>
          !recommendations[cuisine][foodOption].allergens.includes(allergy)
      );

      // check if recommendations[cuisine] has preferences
      const preferencesPresent = preferences.filter(
        (preference) =>
          !recommendations[cuisine][foodOption].preferences.includes(preference)
      );

      try {
        if (allergiesPresent.length > 0 || preferencesPresent.length <= 0) {
          throw new Error("Allergies or preferences not present");
        }

        // check if user has chosen halal and if the food option is halal
        if (
          recommendations[cuisine][foodOption].isHalal &&
          data.externalConditions.isHalal.value
        ) {
          throw new Error("Food Option is not halal");
        }

        // check if user has chosen vegetarian and if the food option is vegetarian
        if (
          recommendations[cuisine][foodOption].isVegetarian &&
          data.externalConditions.isVegetarian.value
        ) {
          throw new Error("Food Option is not vegetarian");
        }

        // check for the group size capacity
        if (
          data.externalConditions.groupSize <
            recommendations[cuisine][foodOption].minGroupSize ||
          data.externalConditions.groupSize >
            recommendations[cuisine][foodOption].maxGroupSize
        ) {
          throw new Error("Group size is not suitable");
        }

        // add the food option to the response
        response.recommendations = {
          ...response.recommendations,
          [cuisine]: [
            ...((response.recommendations[
              cuisine as keyof typeof response.recommendations
            ] || []) as string[]),
            foodOption,
          ],
        };
      } catch (error) {
        continue;
      }
    }
  }

  res
    .status(DEFAULT_RESPONSES.CREATED.status)
    .json({ message: JSON.stringify(response) });
};

export default handler;
