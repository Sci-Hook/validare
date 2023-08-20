import {Request,Response} from 'express';

export function get_file(req:Request,res:Response,file:string) {
    return new Promise<any[]|undefined>((resolve, reject) => { 
        
        if (req.files) {
            if (req.files?.length === undefined) {
                if (req.files[file]) {
                    return resolve(req.files[file])
                }else{
                    return resolve(undefined);
                }
            }else{
                if (req.files) {
                    return resolve(<any>req.files)
                }
            }
        }

        if (req.file) {
            return resolve([req.file])
        }
        
    });
}