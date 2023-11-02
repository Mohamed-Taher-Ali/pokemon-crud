import { Request, Response, NextFunction } from "express";

export const useErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!error) next();
  else res.status(500).json({ error });
};

export const onUnCaughtException = (error) => {
  console.log("[process.on(uncaughtException)]: ", error);
};
