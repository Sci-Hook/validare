import {latex} from "../../../types/schemas";
import * as katex from 'katex';

const regex = '^[\\w-\\.]+@(?<service>[\\w-]+\\.+[\\w-]{2,4}$)';

export function validate_latex(schema:latex,value) {
    return new Promise<'invalid'|'no_error'>(async (resolve, reject) => {
        try {
            katex.renderToString(value, { throwOnError: true });
            resolve('no_error')
        } catch (error) {
            resolve('invalid') 
        }
    });
}