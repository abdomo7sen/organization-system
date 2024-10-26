import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const globalError: ErrorRequestHandler = (err, req, res, next) => {
    const code = err.statusCode || 500;
     res.status(code).json({
      error: err.message,
      code,
      stack: err.stack,
    });
  };