export type invalid_files = {
    fieldname:string,
    originalname:string,
    error:string,
    reason:string
};

export type invalid_files_object = {[key in string]:invalid_files[]|false};