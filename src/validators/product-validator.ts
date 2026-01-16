import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST } from "../lib/errors/BadRequestError.js";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};

export const validateCreateProduct = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").optional().isString(),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .custom((tags: any[]) => tags.every((tag) => typeof tag === "string"))
    .withMessage("Tags must be strings"),
  validate,
];

export const validateUpdateProduct = [
  body("name").optional().notEmpty(),
  body("description").optional().isString(),
  body("price").optional().isNumeric(),
  body("tags")
    .optional()
    .isArray()
    .custom((tags: any[]) => tags.every((tag) => typeof tag === "string")),
  validate,
];

export const validateProductId = [
  param("id").isNumeric().withMessage("Invalid product ID"),
  validate,
];
