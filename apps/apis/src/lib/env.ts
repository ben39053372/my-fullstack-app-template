import { z } from "zod";

export const configSchema = z.object({
	DATABASE_URL: z.url(),
	BETTER_AUTH_URL: z.url(),
	BETTER_AUTH_SECRET: z.string(),
});

export const config = configSchema.parse(process.env);

export type Config = z.infer<typeof configSchema>;
