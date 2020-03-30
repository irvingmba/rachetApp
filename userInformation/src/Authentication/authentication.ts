import axios, { AxiosRequestConfig } from 'axios';

const options:AxiosRequestConfig = {

};

const reqValidation = (data:string) => {
    return `{
        tkn(key:"${data}"){
            id
        }
    }`;
};

export const authenticate = async( data:string ) => {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const valid:any = await axios({
        url: "https://localhost:4000/gql/",
        method: "POST",
        data: {
            query: reqValidation(data)
        },
    }).then((res)=>res.data).catch((rej)=>console.log(rej));
    if(valid.data.tkn.id){
        const id:string = valid.data.tkn.id;
        return id;
    };
    throw "id not found";
};
/**
 * Function that returns the user id from the response structure
 * @param context Access to the response structure
 */
export const getID = (context:any) => {
    const res:any = context.response.locals;
    try {
        if(!res.userID) {
        throw "Code 32: Invalid id";
        };
    } catch (error) {
        return null;
    }
    return res.userID;
};