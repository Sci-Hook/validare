import {extensions,mimes} from 'mime-controller';
import { email, ip, phone, url } from './options';

type size_types = 'bit'|'kib'|'mib'|'gib'|'tib'|'byte'|'kb'|'mb'|'gb'|'tb';

export type alogrithms= 'sha256'|'sha512'|'md5'|
"blake2b512"|"blake2s256"|"rmd160"|"sha1"|
"sha224"|"sha256"|"sha3-224"|"sha3-256"|
"sha3-384"|"sha3-512"|"sha384"|"sha512"|
"sha512-224"|"sha512-256"|"sm3";

export const special_types = [
    'any',
    'file',
    'buffer',
    'string-number'
];

type types = 
'string'|
'number'|
'object'|
'undefined'|
'bigint'|
'boolean'|
'any' |
'string-number'|
'file'|
'buffer';

type special_controllers = 
{type:'email',options?:email}|
{type:'ip',options?:ip}|
{type:'url',options?:url}|
{type:'phone',options?:phone};

type schema = {
    type?:types|types[],
    min_length?:number,
    max_length?:number,
    length?:number,
    special_controllers?:special_controllers,
    regex?:RegExp|string,
    required?:boolean,
    ignore_empty?:boolean,
    values?:any[],
    chars?:string,
    extension?:extensions|extensions[],
    mime?:mimes|mimes[],
    max_size?:{size:number,size_type:size_types},
    min_size?:{size:number,size_type:size_types},
    hash?:{
        alogrithm:alogrithms,
        key:string
    }
}

export{
    schema
}