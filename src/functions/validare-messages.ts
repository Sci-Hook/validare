import {readdirSync, readFileSync} from 'fs';

export async function load_validare_messages(folder:string) {

    let files = await readdirSync(folder);

    await files.syncForEach(function (file,next) {
        let data = readFileSync(`${folder}/${file}`);
        let messages = JSON.parse(`${data}`)
        global.validare.messages = {...global.validare.messages,...messages};
        next();
    })

}