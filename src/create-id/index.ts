import {schema} from '../types/schema';
import {presets_characters} from './presets';

var presets_characters_keys = Object.keys(presets_characters);

function makeid(length, characters) {
    if (!length) {
        length = 8;
    }
    let result = '';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export function create_id(schema?:schema|string) {


    var id_schema:{length?:number,chars?:string} = {chars:'standart',length:8}

    if (typeof schema == 'string') {
        if(global.validare){
            if (global.validare[schema]) {
                var len = global.validare[schema].length;
                var chars = global.validare[schema].chars
                id_schema = {length:len,chars:chars}
            }
        }
    }else if (typeof schema == 'object'){
        if (schema.type == 'string') {
            if (typeof schema.length == 'number') {
                id_schema = {length:schema.length,chars:schema.chars}
            }
        }
    }
   
    var created_characters:string = '';

    return new Promise<string>((resolve, reject) => {

        if (id_schema.chars){ 
            var chars:string = id_schema.chars
            presets_characters_keys.syncForEach(function name(preset_name:string,next_preset) {
                if (id_schema.chars?.indexOf(preset_name) != -1) {
                    if (id_schema.chars) {
                        chars = chars.replace(preset_name, "");
                    }
                    created_characters = created_characters + presets_characters[preset_name];
                }
                next_preset();
            },() => {
                created_characters = created_characters + chars;
                var id = makeid(id_schema.length,created_characters);
                resolve(id)
                });
        }else{
            var id = makeid(id_schema.length,presets_characters.all);
            resolve(id)
        }
    });
    
}