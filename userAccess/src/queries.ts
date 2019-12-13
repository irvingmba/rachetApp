import { decode } from './Authentication/authentication';

export const info = () => `Dark side`;

export const tkn:(parent: undefined, args:{key: string}) => {id:string} = 
function(parent,args) {
    const token = args.key;
    const user = decode(token);
    if(typeof user === "string") {
        throw "Code 14: Invalid token"
    } else{
        return {id: "", ...user};
    };
};