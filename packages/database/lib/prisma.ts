import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

// Use globalThis for broader environment compatibility
const globalForPrisma = globalThis as typeof globalThis & {
	prisma?: PrismaClient;
};

export const createPrismaClient = () => {
	const connectionString = `${process.env.DATABASE_URL}`;
	const adapter = new PrismaPg({ connectionString });
	return new PrismaClient({
		adapter,
	});
};

export const prisma: PrismaClient =
	globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}
