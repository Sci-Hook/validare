import {extensions,mimes} from 'mime-controller';
import { schema } from './schema';

type size_types = 'bit'|'kib'|'mib'|'gib'|'tib'|'byte'|'kb'|'mb'|'gb'|'tb';

export type global = {
    required?:boolean,
    dont_validate_empty?:boolean,
    allow_undefined?:boolean,
    allow_null?:boolean,
    name?:string
}

export type check_length = {min_length?:number|string,max_length?:number|string,length?:number|string}

export type file_schemas = {
    type:'file',
    extension?:extensions|extensions[],
    mime?:mimes|mimes[],
    max_size?:{size:number,size_type:size_types},
    min_size?:{size:number,size_type:size_types}
}

export type string_schemas = {
    type:'string',
    regex?:{pattern:string,flag:string},
    ignore_empty?:boolean,
    chars?:string,
    casetype?:'uppercase'|'lowercase'|'unset'|'combined',
    ignored?:string[]
}&check_length;

export type unicode_name = {
    type:'unicode-name',
    casetype?:'uppercase'|'lowercase'|'unset'|'combined',
    allowed_chars?:string,
    ignore_empty?:boolean,
}&check_length;

export type doi = {
    type:'doi',
    ignore_empty?:boolean
}&check_length;

export type number_schemas = {type:'number'|'bigint'|'string-number'}&check_length&{base?:number};

export type object_schemas = {
    type:'object',
}&check_length;

export type undefined_schemas = {
    type:'undefined',
};

export type boolean_schemas = {
    type:'boolean',
};

export type email_schemas = {
    type:'email',
    services?:string[],
    ignore_empty?:boolean
}&check_length;

export type ip_schemas = {
    type:'ip',
    ignore_empty?:boolean
}&check_length;

export type phone_schemas = {
    type:'phone',
    ignore_empty?:boolean
}&check_length;

export type values_schemas = {
    type:'values',
    values:any[]
}&check_length;

export type url_schemas = {
    type:'url',
    hostnames?:string[],
    ignored_hostnames?:string[],
    protocols?:string[],
    ports?:number[],
    origins?:string[],
    min_length?:number,
    max_length?:number,
    ignore_empty?:boolean
}&check_length;

export type base64 = {
    type:'base64',
    min_size?:number,
    max_size?:number
}

export type array = {
    type:'array',
    possible_types?:(schema)[],
    max_element?:number,
    min_element?:number,
    max_element_eq?:number,
    min_element_eq?:number,
}

export type latex = {
    type:'latex',
    max_length?:number,
    min_length?:number,
    length?:number
}

export type multi_type = {
    type:'multi-type',
    types:schema[]
}