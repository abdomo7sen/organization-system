import { NextFunction, Request, Response } from "express"

export const catchError = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch((error) => {
        next(error);
      });
    };
  };