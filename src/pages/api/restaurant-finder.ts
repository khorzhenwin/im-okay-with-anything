import { DEFAULT_RESPONSES } from "@/utils/errors/default";
import { shuffle } from "@/utils/helpers/array";
import axios from "axios";
import "dotenv/config";
import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

const RestaurantFinderQuerySchema = z.object({
    lat: z.coerce.number(),
    lon: z.coerce.number(),
    radius: z.coerce.number().default(2),
});

type RestaurantFinderQuery = z.infer<typeof RestaurantFinderQuerySchema>;

interface RestaurantFinderRequest extends NextApiRequest {
    body: RestaurantFinderQuery;
}

const GEOAPIFY_API_KEY: string | undefined = process.env.GEOAPIFY_KEY;

const handler = async (req: RestaurantFinderRequest, res: NextApiResponse<RestaurantFinder.Feature[] | { message: string }>) => {
    const { success, data } = RestaurantFinderQuerySchema.safeParse(req.query);

    if (!success) {
        res.status(DEFAULT_RESPONSES.BAD_REQUEST.status).json({ message: DEFAULT_RESPONSES.BAD_REQUEST.message });
        return;
    }

    if (GEOAPIFY_API_KEY == null || GEOAPIFY_API_KEY.trim().length === 0) {
        res.status(DEFAULT_RESPONSES.INTERNAL_SERVER_ERROR.status).json({
            message: "Geoapify API key is missing. Set GEOAPIFY_KEY before requesting restaurants.",
        });
        return;
    }

    try {
        const result = await axios<RestaurantFinder.Response>("https://api.geoapify.com/v2/places", {
            method: "GET",
            params: {
                categories: "catering.restaurant",
                filter: `circle:${data.lon},${data.lat},${data.radius * 1000}`,
                limit: 100,
                bias: `proximity:${data.lon},${data.lat}`,
                apiKey: GEOAPIFY_API_KEY,
            },
        });

        const filtered = result.data.features.filter((f) => f.properties.name != null);

        if (filtered.length === 0) {
            res.json([]);
            return;
        }

        res.json(shuffle(filtered));
        return;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status ?? DEFAULT_RESPONSES.BAD_REQUEST.status;
            const geoapifyMessage =
                typeof error.response?.data?.message === "string"
                    ? error.response.data.message
                    : error.message;

            res.status(status).json({ message: `Geoapify Places API error: ${geoapifyMessage}` });
            return;
        }

        res.status(DEFAULT_RESPONSES.INTERNAL_SERVER_ERROR.status).json({
            message: DEFAULT_RESPONSES.INTERNAL_SERVER_ERROR.message,
        });
        return;
    }
};

export default handler;
