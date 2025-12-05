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
// 커스텀 에러
// 전역 에러핸들러
// 404 핸들러
