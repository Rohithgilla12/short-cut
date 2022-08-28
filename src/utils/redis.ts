import { Client, Entity, Schema } from "redis-om";

import { ShortLink } from "@prisma/client";
import { env } from "../env/server.mjs";

export const redisClient = new Client();

const connect = async () => {
  if (!redisClient.isOpen()) {
    await redisClient.open(env.REDIS_URL);
  }
};

class ShortLinkRedis extends Entity {}

const schema = new Schema(
  ShortLinkRedis,
  {
    id: { type: "number" },
    url: { type: "string", indexed: true },
    createdAt: { type: "date" },
    slug: { type: "string" },
    uid: { type: "string" },
  },
  { dataStructure: "JSON" }
);

export const createIndex = async () => {
  await connect();

  const repository = redisClient.fetchRepository(schema);
  await repository.createIndex();
};

export const createShortLink = async (data: ShortLink) => {
  await connect();

  const repository = redisClient.fetchRepository(schema);
  return await repository.createAndSave(data);
};
