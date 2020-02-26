import axios, {AxiosRequestConfig} from "axios";
import {DEVELOPMENT_MODE} from "../index";

export function getRequest(query: {}){
  return function getObjConfig(config: AxiosRequestConfig):AxiosRequestConfig{
      return {
          ...config,
          data: query
      };
  };
};

export  function makeRequest(config: AxiosRequestConfig){
  if(DEVELOPMENT_MODE) process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  return  axios(config);
};
