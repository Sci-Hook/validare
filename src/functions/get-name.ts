export async function get_name(name:string){
    return new Promise<string>((resolve, reject) => {
        
        var data_name;
        var name_splitted = name.split(':');

        if (name_splitted.length == 1) {
            data_name = name_splitted[0]; 
        }else{
            data_name = name_splitted[1]; 
        }

        var splitted_value = data_name.split('.');
        if (splitted_value.length != 1) {
            resolve(splitted_value[splitted_value.length - 1]);
        }else{
            resolve(data_name);
        }
    });
}