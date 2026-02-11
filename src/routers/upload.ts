import { Router, Request, Response } from "express";
import upload from "../middlewares/upload.js";
import { STATIC_PATH } from "../lib/constants.js";

const router = Router();

router.post(
  "/upload",
  upload.single("image"),
  (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 정적 파일 경로 생성 (예: /static/uploads/filename.jpg)
    const imageUrl = `${STATIC_PATH}/uploads/${req.file.filename}`;

    return res.status(200).json({
      message: "File uploaded successfully",
      imageUrl,
    });
  }
);

export default router;
