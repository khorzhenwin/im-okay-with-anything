import {FormProps} from "@/utils/types/forms";
import {NextApiRequest, NextApiResponse} from "next";
import {DEFAULT_RESPONSES} from "@/utils/errors/default";
import {formatPrompt, promptModel} from "@/utils/helpers/prompt";

interface FormRequest extends NextApiRequest {
    body: FormProps;
}

const handler = async (
    req: FormRequest,
    res: NextApiResponse<{ message: string }>
) => {
    if (req.method !== "POST") {
        res
            .status(DEFAULT_RESPONSES.FORBIDDEN.status)
            .json({message: DEFAULT_RESPONSES.FORBIDDEN.message});
    }

    const data: FormProps = JSON.parse(req.body as unknown as string);
    if (!data) {
        res
            .status(DEFAULT_RESPONSES.BAD_REQUEST.status)
            .json({message: DEFAULT_RESPONSES.BAD_REQUEST.message});
    }

    const promptMessage: string = formatPrompt(data);
    const recommendation: string = await promptModel(promptMessage);

    let response = {
        recommendations: recommendation,
    };
    console.log(recommendation);
    res.status(DEFAULT_RESPONSES.CREATED.status)
        .json({message: JSON.stringify(response)});
};

export default handler;
