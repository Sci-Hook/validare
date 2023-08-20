import {XMLValidator,XMLParser} from 'fast-xml-parser';

var parser = new XMLParser();

export function validateSVG(data) {
    try {
       var error:any = XMLValidator.validate(data);
        if (error.err) {
            return false;
        }else{
            var data = parser.parse(data);
            if (data.svg) {
                return true;   
            }else{
                return false;
            }
        }
    } catch (error) {
        return false;
    }
}