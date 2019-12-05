import axios, { AxiosRequestConfig } from 'axios';

const options:AxiosRequestConfig = {

};

export const authenticate = async ( data:string ) => {
    const valid = await axios.post('https://localhost:4001/',data)
    .then(async (res)=>{
        console.log(res.data);
        return res.data;
    }).catch((rej)=>{
        return rej;
    });
    return await valid;
};