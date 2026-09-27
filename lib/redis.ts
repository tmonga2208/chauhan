// lib/redis.ts
import { Redis } from "@upstash/redis";

// The cache is optional — every caller falls back to MongoDB. Retrying an
// unreachable cache (the client's default backs off ~9s) only delays that
// fallback, so a miss fails straight through.
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  retry: false,
});
