import Credentials from "next-auth/providers/credentials";
import { verifyUser } from "./lib/user";
import { prisma } from "./lib/prisma";

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      authorize: async (credentials: any) => {
        let user = null;

        if (credentials?.email == null || credentials?.password == null) {
          return null;
        }

        user = await verifyUser(credentials?.email, credentials?.password);

        if (!user) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      // Persist the user's data to the token right after signin
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user }: any) {
      // You can control signin flow here
      if (user) {
        try {
          // Update last login time in database
          await prisma.user.update({
            where: { id: parseInt(user.id) },
            data: { lastLogin: new Date() },
          });
        } catch (error) {
          console.error("Error updating last login:", error);
        }
      }
      return true;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
  },

  events: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signOut({ token }: any) {
      // Clear any session-specific data if needed
      if (token?.id) {
        try {
          // Log the signout event
          await prisma.auditLog.create({
            data: {
              userId: parseInt(token.id as string),
              action: "LOGOUT",
            },
          });
        } catch (error) {
          console.error("Error logging signout:", error);
        }
      }
    },
  },
};
