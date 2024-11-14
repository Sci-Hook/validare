import { email_schemas} from "../../../types/schemas";

const regex = /\b(10[.][0-9]{4,}(?:[.][0-9]+)*\/(?:(?!["&\'<>])\S)+)\b/;

export function validate_doi(schema:email_schemas,value) {
    return new Promise<'no_error'|'invalid'>(async (resolve, reject) => {

        if (typeof value != 'string') {
            resolve('invalid');    
            return;
        }

        if (!regex.test(value)) {
            resolve('invalid');    
            return;
        }

        return resolve('no_error');

    });
}