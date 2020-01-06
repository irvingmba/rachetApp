import axios from "axios";

// Subpaths for the request from the client to the server side
const URL_LOGIN = "/login"


/**
 * Function that sends data to the server to login the user
 * @param query string that will be send to the server as a query
 * @param return A promise
 */
export function loginUser(query: string){
    const mutation = axios.post<string,{data:{user:boolean; password:boolean;}}>(URL_LOGIN, query);
    return mutation.catch(reason => {
        console.log(reason);
        throw "Code 50 Something went wrong with the promise"
    });
};
