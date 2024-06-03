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

const handler = async (req: RestaurantFinderRequest, res: NextApiResponse) => {
    const { success, data } = RestaurantFinderQuerySchema.safeParse(req.query);

    if (!success) {
        res.status(DEFAULT_RESPONSES.BAD_REQUEST.status).json({ message: DEFAULT_RESPONSES.BAD_REQUEST.message });
        return;
    }

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

    return res.json(shuffle(filtered));
};

export default handler;
