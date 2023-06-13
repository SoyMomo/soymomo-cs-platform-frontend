import { Session } from "inspector"
import NextAuth, { Account, DefaultSession, User, CallbacksOptions } from "next-auth"
import JWT from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    accessToken?: Account.accessToken
  }
}

declare module "next-auth" {
  interface User {
    AccessToken?: string,
    RefreshToken?: string,
    ExpiresIn?: number,
    TokenType?: string,
    IdToken?: string,
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: User.AccessToken,
    refreshToken?: User.RefreshToken,
    expiresIn?: User.ExpiresIn,
    tokenType?: User.TokenType,
    idToken?: User.IdToken,
  }
}