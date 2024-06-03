import {FormProps} from "@/utils/types/forms";
import {NextApiRequest, NextApiResponse} from "next";
import {DEFAULT_RESPONSES} from "@/utils/errors/default";
import {formatPrompt, promptModel} from "@/utils/helpers/prompt";
import RestaurantRepository from "@/firebase/repository/restaurantRepository";

interface FormRequest extends NextApiRequest {
    body: FormProps;
}

const handler = async (
    req: FormRequest,
    res: NextApiResponse<{ message: string } | { recommendation: string[] }>
) => {
    if (req.method !== "POST") {
        res.status(DEFAULT_RESPONSES.FORBIDDEN.status).json({message: DEFAULT_RESPONSES.FORBIDDEN.message});
    }

    const data: FormProps = JSON.parse(req.body as unknown as string);
    if (!data) {
        res.status(DEFAULT_RESPONSES.BAD_REQUEST.status).json({message: DEFAULT_RESPONSES.BAD_REQUEST.message});
    }

    const promptMessage: string = formatPrompt(data);
    const recommendation: string = await promptModel(promptMessage);

    // parse recommendation as array of strings and preprocess
    const recommendationList: string[] = recommendation.replace(/["'\[\]\n\t]/g, "").split(", ");

    RestaurantRepository.add({session_id:"123", location_id: "123", listing: []});

    res.status(DEFAULT_RESPONSES.CREATED.status).json({recommendation: recommendationList});
};

export default handler;
