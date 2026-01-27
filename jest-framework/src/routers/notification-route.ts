import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product-controller.js";
import {
  validateCreateProduct,
  validateUpdateProduct,
  validateProductId,
} from "../validators/product-validator.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(authenticate(), validateCreateProduct, createProduct);

router
  .route("/:id")
  .get(validateProductId, getProductById)
  .patch(validateProductId, validateUpdateProduct, updateProduct)
  .delete(validateProductId, deleteProduct);

export default router;
