import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url().startsWith("postgres"),
  ADMIN_PASSWORD_HASH: z.string().min(32),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let serverEnv: ServerEnv | undefined;

export function getServerEnv(): ServerEnv {
  serverEnv ??= serverEnvSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL ?? process.env.POSTGRES_URL,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
  });

  return serverEnv;
}