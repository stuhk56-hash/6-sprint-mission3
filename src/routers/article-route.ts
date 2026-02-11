/**
 * 라우트 전체적으로 다시 손봐야 합니다.
 * 각 CRUD 기능대로 경로 잘 설정했는지 꼼꼼히 확인 필요합니다.
 * 그리고 validator 같은 유효성 검사 미들웨어도 잘 확인하시고 라우트에 적용해주세요
 * 어떤 유효성 검사가 필요한지 temp 폴더 참고하세요
 */

/**
 * src/routes/article.ts
 * 자유게시판(Article) 관련 API 라우트 정의
 * - CRUD 경로 정합성 점검 완료
 * - id 파라미터 / body 유효성 검사 미들웨어 적용
 */

import { Router } from "express";
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/article-controller.js";
import {
  validateCreateArticle,
  validateUpdateArticle,
  validateArticleId,
} from "../validators/article-validator.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

// =================================================================
// 1. 게시글 목록 조회 및 등록
// GET  /articles
// POST /articles
// =================================================================
router
  .route("/")
  /**
   * @route POST /articles
   * @desc 새로운 게시글 등록
   */
  .post(authenticate(), validateCreateArticle, createArticle)

  /**
   * @route GET /articles
   * @desc 게시글 목록 조회 (offset 페이지네이션, 검색, 최신순 정렬)
   */
  .get(getAllArticles);

// =================================================================
// 2. 특정 게시글 상세 조회, 수정, 삭제
// GET    /articles/:id
// PATCH  /articles/:id
// DELETE /articles/:id
// =================================================================
router
  .route("/:id")
  /**
   * @route GET /articles/:id
   * @desc 특정 ID를 가진 게시글 상세 조회
   */
  .get(validateArticleId, getArticleById)

  /**
   * @route PATCH /articles/:id
   * @desc 특정 ID를 가진 게시글 수정
   */
  .patch(
    authenticate(),
    validateArticleId,
    validateUpdateArticle,
    updateArticle
  )

  /**
   * @route DELETE /articles/:id
   * @desc 특정 ID를 가진 게시글 삭제
   */
  .delete(authenticate(), validateArticleId, deleteArticle);

export default router;
