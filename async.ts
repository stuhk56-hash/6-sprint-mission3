import type { Request, Response, NextFunction } from 'express'
import { fn } from 'sequelize'

type AsyncController = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<unknown> | unknown

const asyncHandler = 
// 고차함수
(fn: AsyncController) =>
(req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

