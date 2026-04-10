import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// We wrap the client creation in a function to ensure it doesn't crash during 
// the Next.js build-time "Check page data" phase if the DATABASE_URL is missing.
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
