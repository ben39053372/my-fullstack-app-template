import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import type { PrismaClient } from "database";

export const createAuth = ({
	trustedOrigins,
	prisma,
}: {
	trustedOrigins?: string[];
	prisma: PrismaClient;
}) => {
	return betterAuth({
		database: prismaAdapter(prisma, {
			provider: "postgresql",
		}),
		emailAndPassword: {
			enabled: true,
		},
		plugins: [],
		trustedOrigins: ["http://localhost:8000", ...(trustedOrigins ?? [])], // replace with your frontend origin
	});
};
