import { DEFAULT_RESPONSES } from "@/utils/errors/default";
import { shuffle } from "@/utils/helpers/array";
import axios from "axios";
import "dotenv/config";
import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

const ReverseGeocoderQuerySchema = z.object({
    lat: z.coerce.number(),
    lon: z.coerce.number(),
});

type ReverseGeocoderQuery = z.infer<typeof ReverseGeocoderQuerySchema>;

interface ReverseGeocoderRequest extends NextApiRequest {
    body: ReverseGeocoderQuery;
}

const GEOAPIFY_API_KEY: string | undefined = process.env.GEOAPIFY_KEY;

const handler = async (req: ReverseGeocoderRequest, res: NextApiResponse) => {
    const { success, data } = ReverseGeocoderQuerySchema.safeParse(req.query);

    if (!success) {
        res.status(DEFAULT_RESPONSES.BAD_REQUEST.status).json({ message: DEFAULT_RESPONSES.BAD_REQUEST.message });
        return;
    }

    const result = await axios<ReverseGeocoder.Response>("https://api.geoapify.com/v1/geocode/reverse", {
        method: "GET",
        params: {
            lat: data.lat,
            lon: data.lon,
            type: "city",
            format: "json",
            apiKey: GEOAPIFY_API_KEY,
        },
    });

    if (result.data.results.length === 0) {
        res.json([]);
        return;
    }

    return res.json(shuffle(result.data.results));
};

export default handler;
