import {Schema} from './index';

var test = new Schema({
    type:'latex'
});

async function main() {    
    console.log(await test.validate('\\pi'))
}

main();
