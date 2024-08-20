import { Request, Response }  from 'express';
import 'syncforeachloop';

export async function get_value(name:string,req:Request,res:Response) {
    return new Promise<any>((resolve, reject) => {
        
        var datanames = name.split('.');
        var data;
        
        if (datanames[0] == 'req') {
            data = req;  
            datanames.splice(0,1);
        }else if (datanames[0] == 'res'){
            data = res;
            datanames.splice(0,1);
        }else{
            data = req;
        }

        datanames.syncForEach(function(name,next) {
            data = data[name];
            next();    
        },() =>{
            resolve(data);
        })
    });
    
}