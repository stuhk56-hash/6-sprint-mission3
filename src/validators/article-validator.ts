import { Request, Response, NextFunction } from "express";

export const validateCreateArticle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  next();
};

export const validateUpdateArticle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content } = req.body;
  if (!title && !content) {
    return res.status(400).json({ message: "Title or content is required" });
  }
  next();
};

export const validateArticleId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).json({ message: "Invalid article ID" });
  }
  next();
};
