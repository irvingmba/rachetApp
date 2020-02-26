import { AxiosRequestConfig, AxiosResponse } from "axios";
import { getRequest, makeRequest } from "../utils/gralFns";
import { lazyQryTkn } from "../Authentication/authentication";
import { DEVELOPMENT_MODE } from "../index"

const AUTH_SERVER_PATH = "https://localhost:4000/gql/";

const methodPOST: AxiosRequestConfig = {
  url: AUTH_SERVER_PATH,
  method: "POST"
};

const reqErrorMsg = "Something bad went while the server was trying to authenticate the connection";

export async function lazyRequest(token: string){
  
  return await handleErrorPromise(makeRequest(getRequest({query: lazyQryTkn(token)})(methodPOST)),reqErrorMsg);
};

function handleErrorPromise(promise: Promise<AxiosResponse>, msg: string){
  return promise.catch(function(reason){
    console.log("Something bad went while the server was trying to authenticate the connection");
    return null;
  });
};