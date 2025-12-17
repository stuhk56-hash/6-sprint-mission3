import { Request, Response } from 'express';
import * as likeService from '../services/likeService.js';

interface LikePostParams {
  postId: string;
}

interface AuthenticatedRequest<P = {}, B = {}, Q = {}> extends Request<P, any, B, Q> {
  user?: { id: string };
}

export async function likePost(
  req: AuthenticatedRequest,
  res: Response
){
  const { postId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).send({ error: 'User not authenticated' });
  }

  try {
    await likeService.likePost(userId, postId);
    res.status(201).send();
  } catch (error) {
  }
  
  }
}
