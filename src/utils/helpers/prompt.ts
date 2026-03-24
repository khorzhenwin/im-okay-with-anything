import {GoogleGenerativeAI} from "@google/generative-ai";
import 'dotenv/config'
import {FormProps} from "@/utils/types/forms";

const GOOGLE_AI_STUDIO_API_KEY: string | undefined = process.env.GOOGLE_AI_STUDIO_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";

export class PromptModelError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PromptModelError";
    }
}

export const promptModel = async (prompt: string): Promise<string> => {
    if (!GOOGLE_AI_STUDIO_API_KEY) {
        throw new PromptModelError("Missing GOOGLE_AI_STUDIO_API_KEY server environment variable.");
    }

    try {
        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const genAI = new GoogleGenerativeAI(GOOGLE_AI_STUDIO_API_KEY);
        const model = genAI.getGenerativeModel({model: MODEL_NAME});
        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();

        if (!responseText) {
            throw new PromptModelError(`Model ${MODEL_NAME} returned an empty response.`);
        }

        return responseText;
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new PromptModelError(message);
    }
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
