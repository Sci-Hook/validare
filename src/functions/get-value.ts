import {Request,Response} from 'express';

export function get_value(req:Request,res:Response,name:string) {

    if (name.endsWith('?')) name = name.slice(0,-1);
    
    var parsed_name = name.split(':');

    return new Promise<any>(async (resolve, reject) => {

        if (parsed_name.length == 1) {
            if (req.method == 'GET') {
                if(req.query){
                    resolve(req.query[name]);
                }
            }else{
                if (req.body) {
                    if (req.body[name] !== undefined){
                        resolve(req.body[name]);
                    }
                    if (req.query[name] !== undefined){
                        resolve(req.query[name])
                    }
                    resolve(undefined);
                }
            }

        }else{

            var object;
            
            if (req[parsed_name[0]]) {
                object = req[parsed_name[0]];
            }else{
                object = res[parsed_name[0]]
            }

            var entry_point = Object.assign({},object);
            var location = parsed_name[1];
            var location_splitted = location.split('.');
            var data = entry_point;

            location_splitted.syncForEach(function (location,next_location,i,l) {
                
                if (i != l) {
                    if (data[location]){ 
                        data = data[location]
                    }else{
                        return resolve(undefined);
                    }
                }else{
                    data = data[location];
                }

                next_location();
                
            },() => {  
                return resolve(data)
            });

        }
    });
}