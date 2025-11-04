import { prisma } from '../prisma.js';

const commentController = {
  // 상품 댓글 생성
  createProductComment: async (req, res) => {
    try {
      const { productId } = req.params;
      const { content } = req.body;

      // 상품 존재 확인
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: '상품을 찾을 수 없습니다.',
        });
      }

      const comment = await prisma.comment.create({
        data: {
          content,
          product_id: parseInt(productId),
        },
      });

      res.status(201).json({
        success: true,
        message: '댓글이 성공적으로 등록되었습니다.',
        data: comment,
      });
    } catch (error) {
      console.error('상품 댓글 등록 오류:', error);
      res.status(500).json({
        success: false,
        message: '댓글 등록 중 오류가 발생했습니다.',
        error: error.message,
      });
    }
  },

  // 게시글 댓글 생성
  createArticleComment: async (req, res) => {
    try {
      const { articleId } = req.params;
      const { content } = req.body;

      // 게시글 존재 확인
      const article = await prisma.article.findUnique({
        where: { id: parseInt(articleId) },
      });

      if (!article) {
        return res.status(404).json({
          success: false,
          message: '게시글을 찾을 수 없습니다.',
        });
      }

      const comment = await prisma.comment.create({
        data: {
          content,
          article_id: parseInt(articleId),
        },
      });

      res.status(201).json({
        success: true,
        message: '댓글이 성공적으로 등록되었습니다.',
        data: comment,
      });
    } catch (error) {
      console.error('게시글 댓글 등록 오류:', error);
      res.status(500).json({
        success: false,
        message: '댓글 등록 중 오류가 발생했습니다.',
        error: error.message,
      });
    }
  },

  // 댓글 수정
  updateComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const comment = await prisma.comment.update({
        where: { id: parseInt(id) },
        data: { content },
      });

      res.json({
        success: true,
        message: '댓글이 성공적으로 수정되었습니다.',
        data: comment,
      });
    } catch (error) {
      console.error('댓글 수정 오류:', error);

      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: '댓글을 찾을 수 없습니다.',
        });
      }

      res.status(500).json({
        success: false,
        message: '댓글 수정 중 오류가 발생했습니다.',
        error: error.message,
      });
    }
  },

  // 댓글 삭제
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;

      const comment = await prisma.comment.delete({
        where: { id: parseInt(id) },
      });

      res.json({
        success: true,
        message: '댓글이 성공적으로 삭제되었습니다.',
        data: comment,
      });
    } catch (error) {
      console.error('댓글 삭제 오류:', error);

      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: '댓글을 찾을 수 없습니다.',
        });
      }

      res.status(500).json({
        success: false,
        message: '댓글 삭제 중 오류가 발생했습니다.',
        error: error.message,
      });
    }
  },

  // 상품 댓글 목록 조회 (cursor 방식 페이지네이션)
  getProductComments: async (req, res) => {
    try {
      const { productId } = req.params;
      const { cursor, limit = 10 } = req.query;

      // 상품 존재 확인
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: '상품을 찾을 수 없습니다.',
        });
      }

      const take = parseInt(limit);
      const comments = await prisma.comment.findMany({
        where: { product_id: parseInt(productId) },
        orderBy: { id: 'desc' },
        ...(cursor && { cursor: { id: parseInt(cursor) }, skip: 1 }),
        take,
      });

      res.json({
        success: true,
        data: comments,
        pagination: {
          hasMore: comments.length === take,
          nextCursor: comments.length > 0 ? comments[comments.length - 1].id : null,
        },
      });
    } catch (error) {
      console.error('상품 댓글 목록 조회 오류:', error);
      res.status(500).json({
        success: false,
        message: '댓글 목록 조회 중 오류가 발생했습니다.',
        error: error.message,
      });
    }
  },

  // 게시글 댓글 목록 조회 (cursor 방식 페이지네이션)
  getArticleComments: async (req, res) => {
    try {
      const { articleId } = req.params;
      const { cursor, limit = 10 } = req.query;

      // 게시글 존재 확인
      const article = await prisma.article.findUnique({
        where: { id: parseInt(articleId) },
      });

      if (!article) {
        return res.status(404).json({
          success: false,
          message: '게시글을 찾을 수 없습니다.',
        });
      }

      const take = parseInt(limit);
      const comments = await prisma.comment.findMany({
        where: { article_id: parseInt(articleId) },
        orderBy: { id: 'desc' },
        ...(cursor && { cursor: { id: parseInt(cursor) }, skip: 1 }),
        take,
      });

      res.json({
        success: true,
        data: comments,
        pagination: {
          hasMore: comments.length === take,
          nextCursor: comments.length > 0 ? comments[comments.length - 1].id : null,
        },
      });
    } catch (error) {
      console.error('게시글 댓글 목록 조회 오류:', error);
      res.status(500).json({
        success: false,
        message: '댓글 목록 조회 중 오류가 발생했습니다.',
        error: error.message,
      });
    }
  },
};

export default commentController;
