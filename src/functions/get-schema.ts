import { Schema } from "../class/schema";
import { schema } from "../types/schema";
import { get_requiments } from "./get-requiments";

export async function get_schema(name:string) {
    return new Promise<any>(async (resolve, reject) => {
        let _schema = await get_requiments(name);
        resolve(_schema)
    })
}