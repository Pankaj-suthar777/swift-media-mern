import { Response } from "express";

export const responseReturn = (res: Response, code: number, data: any) => {
  if (res.headersSent) {
    return;
  }
  return res.status(code).json(data);
};
