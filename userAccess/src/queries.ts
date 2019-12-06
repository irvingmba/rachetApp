import { decode } from "./Authentication/authentication";

export const tkn = ( parent: undefined, args:{key: string} ) => {
    const token = args.key;
    const key = decode(token);
    if(typeof key === "string"){return};
    const {id} = (key as {id:string;})
    console.log({id});
    return {id};
};