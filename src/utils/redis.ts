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
    url: { type: "string" },
    createdAt: { type: "date" },
    slug: { type: "string", indexed: true },
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

export const getShortLink = async (slug: string) => {
  await connect();

  const repository = redisClient.fetchRepository(schema);
  return <ShortLink | null | undefined>(
    await repository.search().where("slug").equals(slug).return.first()
  );
};
