import { createAuth } from "auth";
import type { Context, Next } from "hono";

export default function withPrismaAuth(c: Context, next: Next) {
	const auth = createAuth({
		prisma: c.get("prisma"),
		trustedOrigins: ["http://localhost:8000"],
	});
	if (!c.get("auth")) {
		c.set("auth", auth);
	}
	return next();
}

export type PrismaAuth = ReturnType<typeof createAuth>;
