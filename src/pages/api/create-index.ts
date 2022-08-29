import { NextApiRequest, NextApiResponse } from "next";

import { createIndex } from "../../utils/redis";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  await createIndex();
  res.status(200).json({
    message: "Index created",
  });
}
