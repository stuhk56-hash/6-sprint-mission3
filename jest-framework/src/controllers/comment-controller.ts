import { Request, Response } from "express";
import { withAsync } from "../lib/withAsync.js";
import * as commentService from "../services/comment-service.js";
import { AuthRequest } from "../middlewares/authenticate.js";

const DEFAULT_LIMIT = 10;

// --- Article Comments ---

export const handleCreateArticleComment = withAsync(
  async (req: AuthRequest, res: Response) => {
    const { id: articleId } = req.params;
    const { content } = req.body;
    const userId = req.user!.id; // authenticate 미들웨어가 보장

    const newComment = await commentService.createArticleComment(
      Number(articleId),
      userId,
      content
    );
    res.status(201).json(newComment);
  }
);

export const handleGetArticleComments = withAsync(
  async (req: Request, res: Response) => {
    const { id: articleId } = req.params;
    const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : DEFAULT_LIMIT;

    const { comments, nextCursor } = await commentService.getArticleComments(
      Number(articleId),
      cursor,
      limit
    );

    res.status(200).json({
      data: comments,
      pagination: {
        nextCursor,
        limit,
      },
    });
  }
);

export const handleUpdateArticleComment = withAsync(
  async (req: AuthRequest, res: Response) => {
    const { id: commentId } = req.params;
    const { content } = req.body;
    const userId = req.user!.id;

    const updatedComment = await commentService.updateArticleComment(
      Number(commentId),
      userId,
      content
    );
    res.status(200).json(updatedComment);
  }
);

export const handleDeleteArticleComment = withAsync(
  async (req: AuthRequest, res: Response) => {
    const { id: commentId } = req.params;
    const userId = req.user!.id;

    await commentService.deleteArticleComment(Number(commentId), userId);
    res.status(204).send();
  }
);

// --- Product Comments ---

export const handleCreateProductComment = withAsync(
  async (req: AuthRequest, res: Response) => {
    const { id: productId } = req.params;
    const { content } = req.body;
    const userId = req.user!.id;

    const newComment = await commentService.createProductComment(
      Number(productId),
      userId,
      content
    );
    res.status(201).json(newComment);
  }
);

export const handleGetProductComments = withAsync(
  async (req: Request, res: Response) => {
    const { id: productId } = req.params;
    const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : DEFAULT_LIMIT;

    const { comments, nextCursor } = await commentService.getProductComments(
      Number(productId),
      cursor,
      limit
    );

    res.status(200).json({
      data: comments,
      pagination: {
        nextCursor,
        limit,
      },
    });
  }
);

export const handleUpdateProductComment = withAsync(
  async (req: AuthRequest, res: Response) => {
    const { id: commentId } = req.params;
    const { content } = req.body;
    const userId = req.user!.id;

    const updatedComment = await commentService.updateProductComment(
      Number(commentId),
      userId,
      content
    );
    res.status(200).json(updatedComment);
  }
);

export const handleDeleteProductComment = withAsync(
  async (req: AuthRequest, res: Response) => {
    const { id: commentId } = req.params;
    const userId = req.user!.id;

    await commentService.deleteProductComment(Number(commentId), userId);
    res.status(204).send();
  }
);
