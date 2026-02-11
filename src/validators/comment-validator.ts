import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { ApiError } from '../lib/errors/ApiError.js';

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map(err => err.msg);
  const errorMessage = extractedErrors.join(' | ');

  return next(new ApiError(400, `유효성 검사 실패: ${errorMessage}`));
};

export const validateCreateComment = [
  body('content')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('댓글 내용을 입력해야 합니다.')
    .isLength({ min: 1, max: 1000 })
    .withMessage('댓글 내용은 1자 이상 1000자 이하로 입력해야 합니다.'),
  validate,
];

export const validateUpdateComment = [
  body('content')
    .optional()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('댓글 내용은 1자 이상 1000자 이하로 입력해야 합니다.'),
  validate,
];