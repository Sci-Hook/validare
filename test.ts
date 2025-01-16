import {Schema} from './index';

var test = new Schema({
    type:'mutli-type',
    types:[
        {
            type:'string',
            length:10
        },
        {
            type:'number',
            max_length:30
        }
    ]
});

async function main() {    
    console.log(await test.validate(890));
}

main();
