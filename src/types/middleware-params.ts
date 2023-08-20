import { Schema } from "../class/schema";

export type options = {
    name:string,
    schema:Schema,
    allow_undefined?:boolean,
    allow_null?:boolean,
    allow_empty?:boolean
};

export type params = (options|string)[];

export type options_type = {
    allow_undefined?:boolean,
    allow_null?:boolean,
    allow_empty?:boolean
}