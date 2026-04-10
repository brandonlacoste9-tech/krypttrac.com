import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  // We use the Prisma adapter to sync users to our central registry
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in", 
  },
  debug: process.env.NODE_ENV === 'development',
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
      name: "kryptotrac Access",
      credentials: {
        email: { label: "Identifier", type: "email", placeholder: "noble@kryptotrac.com" },
        password: { label: "Security Key", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) {
            // Auto-provision high-end users if they aren't in the registry yet
            return await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.email.split('@')[0],
                tier: 'citizen'
              }
            })
          }
          
          return user
        } catch (error) {
          console.error("Auth Registry Handshake Error:", error)
          // Fallback user for critical system access if DB is temporarily isolated
          // This allows UI verification while DB propagates
          if (process.env.DEBUG_AUTH === 'true') {
            return {
              id: 'fallback-user',
              email: credentials.email,
              name: 'Trace Agent',
              tier: 'citizen'
            }
          }
          return null
        }
      }
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture as string
        session.user.tier = token.tier as string
      }
      return session
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.tier) {
        token.tier = session.tier
      }

      if (user) {
        token.id = user.id
        token.tier = (user as any).tier
      }

      // Re-sync with registry to ensure tier status is live
      try {
        const dbUser = await prisma.user.findFirst({
          where: { email: token.email ?? undefined },
        })

        if (dbUser) {
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            picture: dbUser.image,
            tier: dbUser.tier,
          }
        }
      } catch (e) {
        console.warn("Auth JWT Sync Delayed:", e)
      }

      return token
    },
  },
}
