import {SchemaInterface} from '../class/schema';

type types = 
'string'|
'number'|
'object'|
'undefined'|
'bigint'|
'boolean'|
'any';

type email = {
    type:'email',
    options?:{
        services?:string[]
    }
}

type ip = {
    type:'ip',
    options?:{}
}

type url = {
    type:'url',
    options?:{
        hostnames?:string[],
        protocols?:string[],
        ports?:number[]
    }
}

type phone = {
    type:'phone',
    options?:{}
}

type schema = {
    type?:types|types[],
    min_length?:number,
    max_length?:number,
    length?:number,
    special_controllers?:email|ip|url|phone,
    regex?:RegExp,
    required?:boolean,
    ignore_empty?:boolean,
    values?:any[]
}



export{
    schema
}