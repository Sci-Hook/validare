import {XMLValidator,XMLParser} from 'fast-xml-parser';

var parser = new XMLParser();

export function validateXML(data) {
    try {
       var error:any = XMLValidator.validate(data);
        if (error.err) {
            return false;
        }else{
            var data = parser.parse(data);
            if (data['?xml'] !== undefined) {
                return true;
            }
        }
    } catch (error) {
        return false;
    }
}