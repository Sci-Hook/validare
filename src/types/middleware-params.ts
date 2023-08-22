import { Schema } from "../class/schema";

export type options = {
    name:string,
    schema?:Schema|string,
    allow_undefined?:boolean,
    allow_null?:boolean,
    allow_empty?:boolean,
    key?:string
};

export type params = (options|string)[];

export type options_type = {allow_undefined?:boolean,allow_null?:boolean,allow_empty?:boolean,params_schema_key?:string};
export type db_options_type = options_type & {type?:'or'|'and',error?:string};