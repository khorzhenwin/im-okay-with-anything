import { DEFAULT_RESPONSES } from "@/utils/errors/default";
import { shuffle } from "@/utils/helpers/array";
import axios from "axios";
import "dotenv/config";
import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

const AddressAutocompleteQuerySchema = z.object({
    text: z.string(),
});

type AddressAutocompleteQuery = z.infer<typeof AddressAutocompleteQuerySchema>;

interface AddressAutocompleteRequest extends NextApiRequest {
    body: AddressAutocompleteQuery;
}

const GEOAPIFY_API_KEY: string | undefined = process.env.GEOAPIFY_KEY;

const handler = async (req: AddressAutocompleteRequest, res: NextApiResponse) => {
    const { success, data } = AddressAutocompleteQuerySchema.safeParse(req.query);

    if (!success) {
        res.status(DEFAULT_RESPONSES.BAD_REQUEST.status).json({ message: DEFAULT_RESPONSES.BAD_REQUEST.message });
        return;
    }

    const result = await axios<AddressAutocomplete.Response>("https://api.geoapify.com/v1/geocode/autocomplete", {
        method: "GET",
        params: {
            text: data.text,
            format: "json",
            limit: 5,
            filter: "countrycode:my",
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
