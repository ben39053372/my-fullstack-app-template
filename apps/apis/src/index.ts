import { auth } from "auth";
import { type Env, type ExecutionContext, Hono } from "hono";
import { configSchema } from "./lib/env";

type Bindings = {
	DATABASE_URL: string;
	BETTER_AUTH_URL: string;
	BETTER_AUTH_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		configSchema.parse(env.Bindings);
		return app.fetch(request, env, ctx);
	},
};
