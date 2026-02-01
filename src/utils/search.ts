import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prismaClient = new PrismaClient();

// Search endpoint
router.get("/search", async (req: Request, res: Response) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const results = await (prismaClient as any).product.findMany({
      where: {
        OR: [
          { name: { contains: String(query), mode: "insensitive" } },
          { description: { contains: String(query), mode: "insensitive" } },
        ],
      },
    });

    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
