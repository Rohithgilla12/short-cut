import { NextApiRequest, NextApiResponse } from "next";

import { getShortLink } from "../../../utils/redis";
import { prisma } from "./../../../server/db/client";

const slug = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "pls use with a slug" }));

    return;
  }

  console.log(slug);

  const shortLink = await getShortLink(slug);
  if (!shortLink) {
    throw new Error("Shortlink not found");
  }

  // save the visit in the database
  await prisma.analytics.create({
    data: {
      shortLinkId: shortLink.id,
    },
  });

  if (!shortLink) {
    res.statusCode = 404;

    res.send(JSON.stringify({ message: "slug not found" }));

    return;
  }

  return res.json(shortLink);
};

export default slug;
