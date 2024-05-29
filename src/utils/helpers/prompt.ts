import {GoogleGenerativeAI} from "@google/generative-ai";
import 'dotenv/config'
import {FormProps} from "@/utils/types/forms";

const GOOGLE_AI_STUDIO_API_KEY: string | undefined = process.env.GOOGLE_AI_STUDIO_API_KEY;
const genAI = new GoogleGenerativeAI(<string>GOOGLE_AI_STUDIO_API_KEY);

export const promptModel = async (prompt: string): Promise<string> => {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

    const result = await model.generateContent(prompt);
    return result.response.text();
}

export const formatPrompt = (data: FormProps): string => {
    // flatten allergens & preferences data from JSON into array
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

    // format prompt string
    // 1. construct external conditions based on the need to have halal, vegetarian, raining, and group size
    const isHalal: string = data.externalConditions.isHalal.value ? "halal" : "";
    const isVegetarian: string = data.externalConditions.isVegetarian.value ? "vegetarian" : "";
    const shouldBeHalalAndOrVegetarianOrNeither: string = isHalal && isVegetarian ? "is halal and vegetarian" : isHalal ? "is halal" : isVegetarian ? "is vegetarian" : "can be non-halal and non-vegetarian";
    const externalConditionsString: string = "It is currently"
        + (data.externalConditions.isRaining.value ? " raining." : "not raining.")
        + " Can you recommend me some food that "
        + shouldBeHalalAndOrVegetarianOrNeither
        + " and the group size is " + data.externalConditions.groupSize + ".";

    // 2. construct allergens based on the need to avoid dairy, nuts, shellfish, and seafood
    const allergensString: string = allergens.length > 0
        ? "I would like to avoid " + allergens.join(", ") + " as i am allergic."
        : "I do not have any dietary restrictions.";

    // 3. construct preferences based on the need for spicy, fried, steamed, soup, rice, noodles, pasta, meat, eggs, and vegetables
    const preferencesString: string = preferences.length > 0
        ? "I prefer " + preferences.join(", ") + " food."
        : "I do not have any preferences.";

    // 4. Add specific format rules of return value
    const returnFormat: string = "Please return at least 10 recommendations separated by only commas such as food1, food2, food3 without any additional text or special characters.";

    return externalConditionsString + " " + allergensString + " " + preferencesString + " " + returnFormat;
}
