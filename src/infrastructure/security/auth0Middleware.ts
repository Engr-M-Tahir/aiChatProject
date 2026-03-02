import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";

/**
 * Extend Express Request locally
 */
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    roles?: string[];
  };
}

/**
 * Auth0 JWT validation middleware
 */
export const auth0Middleware = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});

/**
 * Attach authenticated user to request
 */
export const attachUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authPayload = (req as any).auth;

  if (!authPayload) {
    return res.status(401).json({
      code: "UNAUTHORIZED",
    });
  }

  const request = req as AuthenticatedRequest;

  request.user = {
    id: authPayload.payload.sub,
    roles:
      authPayload.payload["https://ai-chat-api/roles"] || ["user"],
  };

  next();
};