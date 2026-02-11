import express, { Request, Response } from "express";
import prisma from "../lib/prisma-client.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/posts", authenticate(), createPost as any);
router.get("/posts", getPosts);
router.put("/posts/:id", authenticate(), updatePost as any);
router.delete("/posts/:id", authenticate(), deletePost as any);

async function createPost(req: Request, res: Response) {
  const { content } = req.body;
  const user = (req as any).user;

  const post = await (prisma as any).post.create({
    data: { content, authorId: user.id },
  });

  res.status(201).json(post);
}

async function getPosts(_req: Request, res: Response) {
  const posts = await (prisma as any).post.findMany();
  res.json(posts);
}

async function updatePost(req: Request, res: Response) {
  const { id } = req.params;
  const { content } = req.body;
  const user = (req as any).user;

  const post = await (prisma as any).post.findUnique({
    where: { id: Number(id) },
  });
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.authorId !== user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const updatedPost = await (prisma as any).post.update({
    where: { id: Number(id) },
    data: { content },
  });

  return res.json(updatedPost);
}

async function deletePost(req: Request, res: Response) {
  const { id } = req.params;
  const user = (req as any).user;

  const post = await (prisma as any).post.findUnique({
    where: { id: Number(id) },
  });
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.authorId !== user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await (prisma as any).post.delete({
    where: { id: Number(id) },
  });

  return res.status(204).send();
}

export default router;
