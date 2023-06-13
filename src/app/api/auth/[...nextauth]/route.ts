import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

const authOptions: NextAuthOptions = {
  providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "example@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const res = await fetch("http://localhost/auth/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
          const user = await res.json()
          console.log(user);
    
          if (res.ok && user) {
            return user
          }
          return null
        }
      })
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
      async jwt({ token, user, account, profile }): Promise<JWT> {
        if (user) {
            token.accessToken = user.AccessToken
            token.expiresIn = user.ExpiresIn
            token.idToken = user.IdToken
            token.refreshToken = user.RefreshToken
            token.tokenType = user.TokenType
        }
        console.log({ msg: "JWT Callback Result", token, user, account, profile });
        return token
      },
      async session({ session, user, token }): Promise<Session>{
        console.log({ msg: "Session Callback Result", session, user, token });
        session.accessToken = token.accessToken
        return session
      }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }