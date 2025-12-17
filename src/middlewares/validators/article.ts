import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { ApiError } from '../../utils/apiError';
import { BAD_REQUEST } from '../../constants/status';

/** 
* 유효성 검사 결과를 처리하는 미들웨어
*/
const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // 에러 메시지를 배열로 추출
  const extractedErrors = errors.array().map(err => err.msg);
  const errorMessage = extractedErrors.join(' | ');

  return next(new ApiError(BAD_REQUEST, `유효성 검사 실패: ${errorMessage}`));
};

/**
 * [POST / articles] 게시글 등록 유효성 검사
 */
export const validateCreateArticle = [
    body('title')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage('게시글 제목을 입력해야 합니다.')
        .isLength({ min: 2, max: 100 })
        .withMessage('게시글 제목은 2자 이상 100자 이하로 입력해야 합니다.'),

    body('content')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage('게시글 내용을 입력해야 합니다.')
        .isLength({ min: 10, max: 2000 })
        .withMessage('게시글 내용은 10자 이상 2000자 이하로 입력해야 합니다.'),

    validate,
];

/**
 * [PATCH/articles/:id] 게시글 수정 유효성 검사
 * optional() -> 존재할 때만 유효성 검사
 */
export const validateUpdateArticle = [
    body('title')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('게시글 제목은 2자 이상 100자 이하로 입력해야 합니다.'),

    body('content')
        .optional()
        .trim() 
        .isLength({ min: 10, max: 2000 })
        .withMessage('게시글 내용은 10자 이상 2000자 이하로 입력해야 합니다.'),

    validate,
];

console.log('article.ts')