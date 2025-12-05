import { Request, Response, NextFunction } from 'express';

export function withAsync<
Req extends Request = Request,
Res extends Response = Response
>(
  handler: (req: Req, res: Res, next: NextFunction) => Promise<any> | any
) {
  return function (req: Req, res: Res, next: NextFunction) {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}