import { Request, Response, NextFunction } from 'express';

type ValidateCallback = (req: Request) => string;

export const useValidation =
  (validateCallback: ValidateCallback) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const error = validateCallback(req);

    if (error) res.status(400).send({ error });
    else next();
  };
