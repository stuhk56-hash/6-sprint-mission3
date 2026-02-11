import type { Request, Response, NextFunction } from "express";

export const NotFoundHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(404).json({ message: "Resource not found" });
};

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
};
