import { createPrismaClient } from "database";
import type { Context, Next } from "hono";

export default function withPrisma(c: Context, next: Next) {
	if (!c.get("prisma")) {
		c.set("prisma", createPrismaClient());
	}
	return next();
}
