import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        // TODO: Prisma セットアップ後に実装
        // const user = await prisma.user.findUnique({ where: { email: String(credentials.email) } })
        // if (!user || !await bcrypt.compare(String(credentials.password), user.password)) return null
        // return user
        return null
      },
    }),
  ],
})
