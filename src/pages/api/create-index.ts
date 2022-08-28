import { NextApiRequest, NextApiResponse } from "next";

import { createIndex } from "../../utils/redis";
import { createShortLink } from "./../../utils/redis";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // await createIndex();
  await createShortLink({
    id: 1,
    url: "https://memeflip.netlify.app/",
    slug: "meme",
    userId: "cl7by1mf50006rc45v4vaxkb5",
  });
  res.status(200).send("ok");
}
