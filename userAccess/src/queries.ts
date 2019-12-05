import { decode } from "./Authentication/authentication";

export const tkn = ( parent: undefined, args:{key: string} ) => {
    const token = args.key;
    return decode(token);
};