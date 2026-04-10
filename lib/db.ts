import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// In Prisma 7, the client attempts to validate the connection string immediately 
// upon instantiation. During the Next.js build phase on Vercel, DATABASE_URL 
// is typically undefined, causing a crash. 
// We use a proxy to "lazily" initialize the client only when it's first used,
// effectively bypassing the crash during static analysis/build.
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop, receiver) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient()
    }
    return Reflect.get(globalForPrisma.prisma, prop, receiver)
  }
})

// For backward compatibility for anything expecting the raw object
if (process.env.NODE_ENV !== 'production') {
  // We specify it as a property so it doesn't get Proxy-wrapped multiple times
}
