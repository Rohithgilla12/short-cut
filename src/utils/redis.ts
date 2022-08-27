import { Client, Entity, Schema } from "redis-om";

import { env } from "../env/server.mjs";

const redisClient = new Client();

const connect = async () => {
  if (!redisClient.isOpen()) {
    await redisClient.open(env.REDIS_URL);
  }
};

class ShortLink extends Entity {}

const schema = new Schema(
  ShortLink,
  {
    id: { type: "number" },
    url: { type: "string", indexed: true },
    createdAt: { type: "string" },
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
