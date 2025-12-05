import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// 좋아요 추가
router.post("/:postId/like", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body; // Assuming userId is sent in the request body       

  try {
    await prisma.like.create({
      data: {
        user: { connect: { id: userId } },
        post: { connect: { id: postId } }
      }
    });
    res.status(200).send({ message: 'Post liked successfully' });
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while liking the post' });
  }
}); 

export default router;    