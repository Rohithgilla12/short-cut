import { Analytics } from "@prisma/client";
import { createRouter } from "./context";
import { getShortLink } from "./../../utils/redis";
import { z } from "zod";

interface DateClicks {
  date: string;
  clicks: number;
}

type AssetMapData = {
  [key: string]: Analytics[];
};

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
  })
  .query("getGraphData", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      const analytics = await ctx.prisma.analytics.findMany({
        where: {
          shortLinkId: input.id,
        },
      });
      const assetMapData: AssetMapData = {};
      analytics.forEach((data) => {
        const date = new Date(data.createdAt);
        const dateString = date.toDateString();
        if (assetMapData[dateString] === undefined) {
          assetMapData[dateString] = [data];
        } else {
          assetMapData[dateString]?.push(data);
        }
      });
      const dateChartData: DateClicks[] = [];
      Object.keys(assetMapData).forEach((key) => {
        dateChartData.push({
          date: key,
          clicks: assetMapData[key]?.length ?? 0,
        });
      });

      return {
        dateChartData,
      };
    },
  });
