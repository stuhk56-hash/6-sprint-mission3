import { Request, Response } from "express";
import * as articleService from "../services/article-service.js";
import { AuthRequest } from "../middlewares/authenticate.js";
import { DEFAULT_PAGE, DEFAULT_LIMIT } from "../constants/index.js";

export const createArticle = async (req: Request, res: Response) => {
  const user = (req as AuthRequest).user!;
  const article = await articleService.createArticle(user.id, req.body);
  res.status(201).json(article);
};

export const getAllArticles = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || DEFAULT_PAGE;
  const pageSize = Number(req.query.pageSize) || DEFAULT_LIMIT;
  const skip = (page - 1) * pageSize;
  const search = req.query.search as string;

  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { content: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const result = await articleService.getArticles(skip, pageSize, where, {
    createdAt: "desc",
  });
  res.json(result);
};

export const getArticleById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const article = await articleService.getArticleById(id);
  if (!article) return res.status(404).json({ message: "Article not found" });
  res.json(article);
};

export const updateArticle = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = (req as AuthRequest).user!;

  const article = await articleService.getArticleById(id);
  if (!article) return res.status(404).json({ message: "Article not found" });
  if (article.userId !== user.id)
    return res.status(403).json({ message: "Forbidden" });

  const updated = await articleService.updateArticle(id, req.body);
  res.json(updated);
};

export const deleteArticle = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = (req as AuthRequest).user!;

  const article = await articleService.getArticleById(id);
  if (!article) return res.status(404).json({ message: "Article not found" });
  if (article.userId !== user.id)
    return res.status(403).json({ message: "Forbidden" });

  await articleService.deleteArticle(id);
  res.status(204).send();
};
