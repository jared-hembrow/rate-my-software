import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

// Import provider libraries for different authentication services
import GithubProvider from "next-auth/providers/github";
import AzureADProvider from "next-auth/providers/azure-ad";
import GoogleProvider from "next-auth/providers/google";

// Define the configuration options for NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    // Azure AD Provider configuration
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || "", // Client ID for Azure AD
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "", // Client Secret for Azure AD
      tenantId: process.env.AZURE_AD_TENANT_ID, // Tenant ID for Azure AD
    }),

    // Github Provider configuration
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "", // Client ID for Github
      clientSecret: process.env.GITHUB_SECRET || "", // Client Secret for Github
    }),

    // Google Provider configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "", // Client ID for Google
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", // Client Secret for Google
    }),
  ],
};

// Export the NextAuth instance with the specified options
export default NextAuth(authOptions);
