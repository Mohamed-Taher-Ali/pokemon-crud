import { Request, Response, NextFunction } from 'express';

export const usePagination =
  (pageSize = 10) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const queryPage = req.query?.page as unknown as number;
    const page = isNaN(+queryPage) ? 1 : +queryPage;
    const offset = pageSize * (page - 1);

    req.pagination = {
      limit: pageSize,
      offset,
    };

    next();
  };
