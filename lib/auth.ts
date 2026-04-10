import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

// During the Next.js build phase (static analysis), environment variables like 
// DATABASE_URL are often hidden. Prisma 7 is very strict and will crash if it 
// tries to initialize without a valid connection. We bypass the adapter 
// specifically during this phase to allow the build to complete.
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || !process.env.DATABASE_URL;

export const authOptions: NextAuthOptions = {
  adapter: isBuildPhase ? undefined : PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Kingdom Access",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "king@kryptokings.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.email.split('@')[0],
              tier: 'free'
            }
          })
        }
        
        return user
      }
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.tier = token.tier as string
      }
      return session
    },
    async jwt({ token, user }) {
      // In build phase or if DB is missing, return limited token
      if (isBuildPhase) return token;

      const dbUser = await prisma.user.findFirst({
        where: { email: token.email },
      })

      if (!dbUser) {
        if (user) {
          token.id = user.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        tier: dbUser.tier,
      }
    },
  },
}
