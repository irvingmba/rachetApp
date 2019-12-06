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

export const authenticate = ( data:string ) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const valid = axios({
        url: "https://localhost:4001/gql/",
        method: "POST",
        data: {
            query: reqValidation(data)
        },
    });
    return valid;
};