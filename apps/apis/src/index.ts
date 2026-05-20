import type { PrismaClient } from "database";
import { Hono } from "hono";
import { cors } from "hono/cors";
import withPrisma from "./lib/withPrisma";
import withPrismaAuth, { type PrismaAuth } from "./middlewares/withPrismaAuth";

type Bindings = {
	DATABASE_URL: string;
	BETTER_AUTH_URL: string;
	BETTER_AUTH_SECRET: string;
};

type Variables = {
	prisma: PrismaClient;
	auth: PrismaAuth;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use(
	"/api/auth/*", // or replace with "*" to enable cors for all routes
	cors({
		origin: ["http://localhost:8000"], // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.on(
	["POST", "GET"],
	"/api/auth/*",
	withPrisma,
	withPrismaAuth,
	async (c) => {
		return await c.get("auth").handler(c.req.raw);
	},
);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

export default app;
