import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(8080),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log("Invalid env", _env.error.format());

  throw new Error("Invalid env.");
}

export const env = _env.data;
