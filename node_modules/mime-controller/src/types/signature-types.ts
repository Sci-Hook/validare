import {supported_file_types} from './supported-file-types';
import {mimes,extensions} from './mimes'

type signature_type = {  
    extension:extensions,
    magic_numbers?:{
        start_with?:string[],
        contain?:string[],
        ends_with?:string[]
    },
    mime:mimes,
    controller?:Function
}

type signature_types = {
    [key in supported_file_types]:signature_type
}

export{
    signature_types,signature_type
}