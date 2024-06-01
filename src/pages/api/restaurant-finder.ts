import { DEFAULT_RESPONSES } from "@/utils/errors/default";
import { promptModel } from "@/utils/helpers/prompt";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

const RestaurantFinderQuerySchema = z.object({
    lat: z.coerce.number(),
    lng: z.coerce.number(),
    radius: z.coerce.number().default(2),
});

type RestaurantFinderQuery = z.infer<typeof RestaurantFinderQuerySchema>;

interface RestaurantFinderRequest extends NextApiRequest {
    body: RestaurantFinderQuery;
}

const handler = async (req: RestaurantFinderRequest, res: NextApiResponse) => {
    const { success, data } = RestaurantFinderQuerySchema.safeParse(req.query);

    if (!success) {
        res.status(DEFAULT_RESPONSES.BAD_REQUEST.status).json({ message: DEFAULT_RESPONSES.BAD_REQUEST.message });
        return;
    }

    const result = await axios("https://overpass-api.de/api/interpreter", {
        method: "POST",
        // The body contains the query
        // to understand the query language see "The Programmatic Query Language" on
        // https://wiki.openstreetmap.org/wiki/Overpass_API#The_Programmatic_Query_Language_(OverpassQL)
        data:
            "data=" +
            encodeURIComponent(
                `[out:json][timeout:10];(node["amenity"="restaurant"](around:${data.radius * 1000},${data.lat},${data.lng}););out tags qt center;`,
            ),
    });

    const newResult = await promptModel(
        `Pick 15 random and good restaurants based on this list. Return it as pure JSON, no markdown or any other formatting: ${JSON.stringify(result.data.elements)}`,
    );

    return res.json(JSON.parse(newResult));
};

export default handler;
