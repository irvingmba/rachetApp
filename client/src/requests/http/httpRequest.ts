import axios, { AxiosRequestConfig } from "axios";
import { IdataRegistry } from "./mutations";

// Subpaths for the request from the client to the server side
import { URL_LOGIN, URL_REGISTER, URL_CONTACT } from "../../globalConfig";


/**
 * Function that sends data to the server to login the user
 * @param query string that will be send to the server as a query
 * @param return A promise
 */
export function loginUser(query: {}){
    const mutation = axios.post<string,{data:{ login:{user:boolean; password:boolean;}}}>(URL_LOGIN, query);
    return mutation.catch(reason => {
        alert("Something is wrong with your connection, verify it and try again");
        throw "Code 50 Something went wrong with the promise"
    });
};

/**
 * Function that sends the registry form to the server
 * @param query A string with the information to the server
 * @param return A promise with the pending answer
 */
export function sendRegistry(query: {}){
    const mutation = axios.post<string, {data: IdataRegistry}>(URL_REGISTER,query);
    return mutation.catch(reason => {
        alert("Something is wrong with your connection, verify it and try again");
        throw "Code 52: Something went wrong when the registry was been sent";
    });
};

/**
 * Function that returns a promise of sending a request to add a contact
 * @param mutation graphql mutation
 */
export function addContact(mutation: {}) {
    const request = getRequest(mutation)(addContacConfig);
    return axios(request).catch(reason => {
        alert("Something is wrong with your connection, verify it and try again");
        console.log(reason);
        throw "Code 53: Something wrong happened when attempeted to add a contact";
    });
};

const addContacConfig:AxiosRequestConfig = {
    method: "POST",
    url: URL_CONTACT,
};

export function getContacts(query: {}){
    // const request = getRequest(query)()
};




function getRequest(query: {}){
    return function getObjConfig(config: AxiosRequestConfig){
        return {
            ...config,
            data: query
        };
    };
};

