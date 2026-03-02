import { Request, Response, NextFunction } from "express";

const MAX_REQUEST_AGE_MS = 30 * 1000; // 30 seconds

export const requestSecurity = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const timestampHeader = req.headers["x-request-timestamp"];

  if (!timestampHeader) {
    return res.status(400).json({
      code: "MISSING_TIMESTAMP",
    });
  }

  const requestTime = Number(timestampHeader);
  const now = Date.now();

  if (isNaN(requestTime)) {
    return res.status(400).json({
      code: "INVALID_TIMESTAMP",
    });
  }

  if (now - requestTime > MAX_REQUEST_AGE_MS) {
    return res.status(401).json({
      code: "REQUEST_EXPIRED",
    });
  }

  next();
};