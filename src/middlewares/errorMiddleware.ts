import { NextFunction, Request, Response } from 'express';

export function errorHandlerMiddleware(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {

  console.log(err);
  if (err.mensage) {
    return res.status(errorTypeToStatusCode(err.type)).send(err.mensage);
  }

  if (err.type) {
    return res.sendStatus(errorTypeToStatusCode(err.type));
  }

  return res.sendStatus(500);
}

function errorTypeToStatusCode(errorType: string) {
  if (errorType === 'conflict') return 409;
  if (errorType === 'not_found') return 404;
  if (errorType === 'unauthorized') return 401;
  if (errorType === 'unprocessable entity') return 422;

  return 400;
}
