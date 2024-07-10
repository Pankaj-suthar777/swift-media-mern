import { Response } from "express";

export const responseReturn = (res: Response, code: number, data: any) => {
  return res.status(code).json(data);
};
