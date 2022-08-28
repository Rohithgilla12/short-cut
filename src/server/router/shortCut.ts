import { createRouter } from "./context";
import { createShortLink } from "./../../utils/redis";
import { z } from "zod";

export const shortCutRouter = createRouter()
  .mutation("createShortLink", {
    input: z.object({
      url: z.string().url(),
      slug: z.string(),
    }),
    async resolve({ input, ctx }) {
      // Save to planetscale database
      const shortLink = await ctx.prisma.shortLink.create({
        data: {
          url: input.url,
          slug: input.slug,
          userId: ctx.session?.user?.id,
        },
      });

      // Save in Redis
      await createShortLink(shortLink);

      return shortLink;
    },
  })
  .query("getShortLink", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.shortLink.findFirst({
        where: {
          slug: input.slug,
        },
      });
    },
  })
  .query("getAllShortLinks", {
    async resolve({ ctx }) {
      return await ctx.prisma.shortLink.findMany();
    },
  })
  .query("getAllShortLinksByUser", {
    async resolve({ ctx }) {
      return await ctx.prisma.shortLink.findMany({
        where: {
          userId: ctx.session?.user?.id,
        },
      });
    },
  });
