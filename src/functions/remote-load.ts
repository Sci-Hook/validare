import 'syncforeachloop';

export async function remote_load_files(dist:string) {
    
    if (!global.validare) {
        global.validare = {};
    }

    var response = await fetch(`${dist}/map.json`);
    var files = await response.json();

    files.syncForEach(async function (file,next) {
        var response = await fetch(`${dist}/${file}`);
        var schemas = await response.json();

        global.validare = Object.assign(global.validare, schemas)
        next();
    });

}