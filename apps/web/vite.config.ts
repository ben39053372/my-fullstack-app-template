import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { z } from "zod";

const envSchema = z.object({
	VITE_BACKEND_URL: z.url(),
});

const config = defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	const validatedEnv = envSchema.parse(env);
	console.log({ validatedEnv });
	return {
		server: {
			port: 8000,
			strictPort: true,
		},
		resolve: { tsconfigPaths: true },
		plugins: [
			devtools(),
			cloudflare({ viteEnvironment: { name: "ssr" } }),
			tailwindcss(),
			tanstackStart(),
			viteReact(),
		],
	};
});

export default config;
