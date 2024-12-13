import {Schema} from './index';

var test = new Schema({
    type:'doi',
    dont_validate_empty:true
});

async function main() {    
    console.log(await test.validate('sdfafdafdasf'));
}

main();
