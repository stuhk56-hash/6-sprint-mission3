import type { Response } from "express";
import * as likeService from "../services/like-Service.js";
import type { AuthRequest } from "../middlewares/authenticate.js";

export async function likePost(req: AuthRequest, res: Response) {
  const postId = Number(req.params['postId']);
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).send({ error: "User not authenticated" });
  }

  try {
    await likeService.likePost(userId, postId);
    return res.status(201).send();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({ error: error.message });
    }
    return res.status(500).send({ error: "An unknown error occurred" });
  }
}
