import { file_schemas,
    string_schemas,
    global,
    email_schemas,
    ip_schemas,
    phone_schemas,
    url_schemas,
    number_schemas,
    object_schemas,
    boolean_schemas,
    undefined_schemas
} from './schemas';

type schema = file_schemas&global|
            string_schemas&global|
            email_schemas&global|
            ip_schemas&global|
            phone_schemas&global|
            url_schemas&global|
            number_schemas&global|
            object_schemas&global|
            boolean_schemas&global|
            undefined_schemas&global;

export{
    schema
}