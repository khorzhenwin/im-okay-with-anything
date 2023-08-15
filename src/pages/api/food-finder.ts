import { FormProps } from "@/utils/types/forms";
import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_RESPONSES } from "@/utils/errors/default";

interface FormRequest extends NextApiRequest {
  body: FormProps;
}

interface keys {
  [key: string]: string;
}

const handler = (
  req: FormRequest,
  res: NextApiResponse<{ message: string }>
) => {
  if (req.method !== "POST") {
    res
      .status(DEFAULT_RESPONSES.FORBIDDEN.status)
      .json({ message: DEFAULT_RESPONSES.FORBIDDEN.message });
  }

  const data = req.body;
  if (!data) {
    res
      .status(DEFAULT_RESPONSES.BAD_REQUEST.status)
      .json({ message: DEFAULT_RESPONSES.BAD_REQUEST.message });
  }

  const allergens = [];
  const preferences = [];

  for (const allergy in data.allergens) {
    if (data.allergens[allergy as keyof typeof data.allergens].value) {
      allergens.push(allergy);
    }
  }

  for (const preference in data.preferences) {
    if (data.preferences[preference as keyof typeof data.preferences].value) {
      preferences.push(preference);
    }
  }

  console.log(allergens);
  console.log(preferences);
  res
    .status(DEFAULT_RESPONSES.CREATED.status)
    .json({ message: DEFAULT_RESPONSES.CREATED.message });
};

export default handler;
