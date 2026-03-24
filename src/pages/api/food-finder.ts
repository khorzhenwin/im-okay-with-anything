import {FormProps} from "@/utils/types/forms";
import {NextApiRequest, NextApiResponse} from "next";
import {DEFAULT_RESPONSES} from "@/utils/errors/default";
import {formatPrompt, promptModel} from "@/utils/helpers/prompt";

interface FormRequest extends NextApiRequest {
    body: FormProps | string;
}

const handler = async (
    req: FormRequest,
    res: NextApiResponse<{ message: string } | { recommendation: string[] }>
) => {
    if (req.method !== "POST") {
        return res.status(DEFAULT_RESPONSES.FORBIDDEN.status).json({message: DEFAULT_RESPONSES.FORBIDDEN.message});
    }

    try {
        const data: FormProps = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

        if (!data) {
            return res.status(DEFAULT_RESPONSES.BAD_REQUEST.status).json({message: DEFAULT_RESPONSES.BAD_REQUEST.message});
        }

        const promptMessage: string = formatPrompt(data);
        const recommendation: string = await promptModel(promptMessage);

        // parse recommendation as array of strings and preprocess
        const recommendationList: string[] = recommendation
            .replace(/["'\[\]\n\t]/g, "")
            .split(", ")
            .filter(Boolean);

        return res.status(DEFAULT_RESPONSES.CREATED.status).json({recommendation: recommendationList});
    } catch (error) {
        console.error("food-finder handler failed", error);
        return res
            .status(DEFAULT_RESPONSES.INTERNAL_SERVER_ERROR.status)
            .json({message: DEFAULT_RESPONSES.INTERNAL_SERVER_ERROR.message});
    }
};

export default handler;
