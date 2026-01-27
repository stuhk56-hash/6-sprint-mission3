import express, { Request, Response } from "express";
import prisma from "../lib/prisma-client.js";

const router = express.Router();

// 좋아요 추가
router.post("/:postId/like", async (req: Request, res: Response) => {
  const postId = Number(req.params.postId);
  const { userId } = req.body; // Assuming userId is sent in the request body

  try {
    await (prisma as any).like.create({
      data: {
        user: { connect: { id: userId } },
        post: { connect: { id: postId } }, // Ensure postId is a number
      },
    });
    res.status(200).send({ message: "Post liked successfully" });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while liking the post" });
  }
});

export default router;
