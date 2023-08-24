import {loadFiles} from 'scihook-schema-loader';

function loadSchemas(files:string|string[]) {loadFiles('validare',files)}

//tpyes
import {schema} from './types/schema';
//types

import {hasher} from './create-hash'

import {Schema} from './class/schema';
import {create_id as ID} from './create-id';
import {validator} from './validator'

import {validate_email} from './validator/special/validate-email'
import {validate_ip} from './validator/special/validate-ip'
import {validate_phone} from './validator/special/validate-phone'
import {validate_url} from './validator/special/validate-url'

export{
    schema,
    Schema,
    loadSchemas,
    validator,
    ID,
    validate_email,
    validate_ip,
    validate_phone,
    validate_url,
    hasher
}