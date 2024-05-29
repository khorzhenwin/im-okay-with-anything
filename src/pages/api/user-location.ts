import {NextApiRequest, NextApiResponse} from "next";
import {DEFAULT_RESPONSES} from "@/utils/errors/default";
import {getUserLocation} from "@/utils/helpers/location";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<{ message: string } | { locationName: string }>
) => {
    if (req.method !== "GET") {
        res.status(DEFAULT_RESPONSES.FORBIDDEN.status).json({message: DEFAULT_RESPONSES.FORBIDDEN.message});
    }

    const locationName: string = await getUserLocation(req.query.userIp as string);
    res.status(DEFAULT_RESPONSES.OK.status).json({locationName});
}

export default handler;