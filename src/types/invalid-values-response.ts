import { Request, Response } from "express";
import { invalid_value } from "./invalid_value";

export type invalid_values_response = (invalid_values:invalid_value[],req:Request,res:Response) => any;
export type invalid_file_response = (invalid_values:invalid_value,req:Request,res:Response) => any;