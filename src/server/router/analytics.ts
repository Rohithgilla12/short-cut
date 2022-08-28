import { createRouter } from "./context";
import { getShortLink } from "./../../utils/redis";
import { z } from "zod";

export const analyticsRouter = createRouter()
  .mutation("createAnalytics", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input, ctx }) {
      // fetch the shortlink from redis (coz fast 🔥)
      const shortLink = await getShortLink(input.slug);
      if (!shortLink) {
        throw new Error("Shortlink not found");
      }
      // save the visit in the database
      await ctx.prisma.analytics.create({
        data: {
          shortLinkId: shortLink.id,
        },
      });
    },
  })
  .query("getLinkAnalytics", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.analytics.findMany({
        where: {
          shortLinkId: input.id,
        },
      });
    },
  });
