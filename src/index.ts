import {Schema} from './class/schema';
import {validate_request} from './modules/validate-middleware';
import {create_id} from './modules/create-id';
import {create_id as ID} from './create-id';
import {loadValidatonRules} from './modules/loader'
import {validator} from './validator'
import {files,files_array} from './types/files'

//files
import {validate_files as validate_files} from './modules/validate-files';
//files

//db
import {validate_exist} from '../src/modules/db/validate-exist';
import {validate_not_exist} from '../src/modules/db/validate-not-exist';
import {validate_count} from '../src/modules/db/validate-count';
import {delete_value} from '../src/modules/db/delete';
import { replace } from '../src/modules/db/replace';
//db

const db = {
    validate_exist,
    validate_not_exist,
    validate_count,
    delete_value,
    replace
}

export{
    Schema,
    validate_request,
    create_id,
    loadValidatonRules,
    validator,
    ID,
    validate_files,
    files,files_array,
    validate_count,
    db
}