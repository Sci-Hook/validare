export type files = {
    fieldname:string,
    size:number,
    mimetype:string|null,
    extension:string|null,
    buffer:Buffer,
    originalname:string,
    name:string
}
export type files_array = files[]