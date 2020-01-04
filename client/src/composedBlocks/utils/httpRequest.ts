import axios from "axios";

// Subpaths for the request from the client to the server side
const URL_LOGIN = "/login"


/**
 * Function that sends data to the server to login the user
 * @param query string that will be send to the server as a query
 * @param return A promise
 */
export function loginUser(query: string){
    const mutation:any = axios({
        url: URL_LOGIN,
        method: "POST",
        data: {
            query
        },
    }).then((res)=>res.data).catch((rej)=>console.log(rej));
    console.log(mutation);
};