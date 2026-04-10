import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in", // Redirect auth errors back to our custom sign-in
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
      name: "kryptotrac Access",
      credentials: {
        email: { label: "Identifier", type: "email", placeholder: "noble@kryptotrac.com" },
        password: { label: "Security Key", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        // Optimized check: If user doesn't exist, we create them as a 'citizen'
        if (!user) {
          try {
            return await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.email.split('@')[0],
                tier: 'citizen'
              }
            })
          } catch (e) {
            console.error("Authentication Registry Error:", e)
            return null
          }
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
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.tier) {
        token.tier = session.tier
      }

      if (user) {
        token.id = user.id
      }

      // Refresh data from the registry
      const dbUser = await prisma.user.findFirst({
        where: { email: token.email },
      })

      if (!dbUser) return token

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
