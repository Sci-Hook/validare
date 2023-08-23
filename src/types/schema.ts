import {extensions,mimes} from 'mime-controller';
import { email, ip, phone, url } from './options';

type size_types = 'bit'|'kib'|'mib'|'gib'|'tib'|'byte'|'kb'|'mb'|'gb'|'tb';

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
{
    type:'email',
    options?:email
}|
{
    type:'ip',
    options?:ip
}|
{
    type:'url',
    options?:url
}|
{
    type:'phone',
    options?:phone
}

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
    min_size?:{size:number,size_type:size_types}
}

export{
    schema
}