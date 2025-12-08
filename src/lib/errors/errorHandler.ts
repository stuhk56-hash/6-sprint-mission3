import type { Request, Response, NextFunction } from 'express'

// 1. 글로벌 에러 핸들러
export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    path: string | null;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.path = null;
    
    // 고급 옵션
    Error.captureStackTrace(this, this.constructor);
    }
  }

// 2) 400 에러클래스
export class ValidationError extends AppError {
  constructor(pathOrMessage: string | null, message?: string) {
    if (message !== undefined) {
      // A) 필드명 + 커스텀 메시지
      super(message, 400);
      this.path = pathOrMessage;
    } else {
      // B) 커스텀 메시지만 전달
      super(pathOrMessage || '입력한 데이터가 올바르지 않습니다.', 400);
      }
    }
  
// 3) 401 에러클래스
export class UnauthorizedError extends AppError {
  constructor(pathOrMessage: string | null, message?: string) {
    if (message !== undefined) {
      // A) 필드명 + 커스텀 메시지
      super(message, 401);
      this.path = pathOrMessage;
    } else {
      // B) 커스텀 메시지만 전달
      super(pathOrMessage || '입력한 데이터가 올바르지 않습니다.', 400);
      }
    }
  }

// 4) 404 에러클래스
export class NotFoundError extends AppError {
  constructor(message = '리소스를 찾을 수 없습니다.') {
    super(message, 404);
 }
}

// 5) 409 에러클래스
export class ConflictError extends AppError {
  constructor(message = '이미 존재하는 데이터입니다.') {
    super(message, 409);
 }
}

// 6) 전역 에러핸들러
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
 // 'debugError('에러 발생', err);
 console.log('에러 발생', err);

// 6-1) 프리즈마 에러 처리
if (err.code === 'P2002') {
  return res.status(409).json({
    message: '이미 존재하는 타입입니다',
    error: 'CONFLICT',
  });
}

if (err.code === 'P2025') {
  return res.status(404).json({
    message: '리소스를 찾을 수 없습니다',
    error: 'NOT_FOUND',
  });
}

// 6-2) Multer (파일 업로드) 에러처리
  if(err.code === 'MulterError') {
    return res.status(400).json({
      message: err.message,
      error: 'FILE_UPLOAD_ERROR',
    });
  }
};

// 6-3) 커스텀 에러 처리 // *추후에 복습
  const errorType = err.constructor.name.replace('Error', '').toUpperCase();
  const response: { message: string; error: string; path?: string | null } = {
    message: err.message,
    error: errorType,
  }

  if (err.path) {
    response.path = err.path;
  }
  return res.status(err.statusCode).json(response);
}
};


// 6-4) 예상하지 못한 에러 처리
const statusCode = err.statusCode || 500;
const message = err.message || '서버 에러가 발생했습니다';

res.status(statusCode).json({
  message,
  error: 'SERVER_ERROR',
});
};

// 7) 404 에러핸들러
export const NotFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({
    message: '요청한 리소스를 찾을 수 없습니다.',
    error: 'NOT_FOUND',
});
};

// 6-3) 커스텀 에러 처리 버전 2
import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  path?: string | null;
}

export const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // 에러 이름 → 'ValidationError' → 'VALIDATION'
  const errorType = err.constructor.name.replace('Error', '').toUpperCase();

  const response: {
    message: string;
    error: string;
    path?: string | null;
  } = {
    message: err.message,
    error: errorType,
  };

  if (err.path) {
    response.path = err.path;
  }

  return res.status(err.statusCode || 500).json(response);
};



