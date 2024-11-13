import 'syncforeachloop';

var validare_schemas = {};
var load_finished = false;

export function remoteLoadFiles() {

    return new Promise<void>( async (resolve, reject) => {

        
        var map_meta = document.querySelector('[name="validare-schemas"]');
        var dist = map_meta?.getAttribute('dist');

        var schemas = JSON.parse(`[${map_meta?.getAttribute('schemas')}]`);

        if (!schemas) {
            return console.error('No any schema attached')
        }

        await schemas.syncForEach(async function (file,next) {
            var response = await fetch(`${dist}/${file}`);
            if (response.status != 200) {
                console.error(`${file} is not accessable`);  
                return next();
            }
            var schemas = await response.json();
            validare_schemas = Object.assign(validare_schemas, schemas)
            next();
        });

        resolve();    
    });

}

export function get_remote_laded_schemas() {
    
    return new Promise<object>(async (resolve, reject) => {
        if (load_finished) {return resolve(validare_schemas);}

        await remoteLoadFiles();
        return resolve(validare_schemas);
    })

}