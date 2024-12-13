import {Schema} from './index';

var test = new Schema({
    type:'unicode-name',
    ignore_empty:true
});

async function main() {    
    console.log(await test.validate(''));
}

main();
