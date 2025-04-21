// types/auth.ts

/**
 * Represents the claims from a Firebase Auth session token
 */
export interface AuthClaims {
  uid: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;

  // Custom claims
  admin?: boolean;
  subscriptionStatus?: "active" | "none";
  subscriptionQuantity?: number;
  stripeCustomerId?: string;
  organisationId?: string;

  // Standard JWT fields
  iat?: number;
  exp?: number;
  aud?: string;
  iss?: string;

  [key: string]: any; // For any other claims
}
