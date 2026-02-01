import { Router } from "express";
import {
  handleCreateArticleComment,
  handleGetArticleComments,
  handleUpdateArticleComment,
  handleDeleteArticleComment,
  handleCreateProductComment,
  handleGetProductComments,
  handleUpdateProductComment,
  handleDeleteProductComment,
} from "../controllers/comment-controller.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

// Article Comments
router.post("/articles/:id", authenticate(), handleCreateArticleComment);
router.get("/articles/:id", handleGetArticleComments);
router.patch(
  "/articles/comments/:id",
  authenticate(),
  handleUpdateArticleComment
);
router.delete(
  "/articles/comments/:id",
  authenticate(),
  handleDeleteArticleComment
);

// Product Comments
router.post("/products/:id", authenticate(), handleCreateProductComment);
router.get("/products/:id", handleGetProductComments);
router.patch(
  "/products/comments/:id",
  authenticate(),
  handleUpdateProductComment
);
router.delete(
  "/products/comments/:id",
  authenticate(),
  handleDeleteProductComment
);

export default router;
