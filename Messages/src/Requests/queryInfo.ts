import { buildQuery, queryData, queryType } from "../utils/queryBuilder";
import { getRequest, makeRequest } from "../utils/gralFns";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { INFO_URL } from "../globals";

/**
 * Takes the authentication cookie and asks the contacts ids
 * @token Authentication cookie
 * @returns A string array containing all the contacts ids
 */
export async function getOwnContacts(token: string) {
  const paramQryContacts: queryData = {
    name: "getContacts",
    type: queryType.Query,
    params: [
      "id"
    ]
  };
  const qryConfig:AxiosRequestConfig = {
    headers: {
      Cookie: `${token};`
    },
    url: INFO_URL,
    method: "POST"
  };
  const qry = buildQuery(paramQryContacts)
  const request = getRequest({query: qry})(qryConfig)
  const asyncOperation = await makeRequest(request)
  .catch(function(reason){
    console.error(reason, "Something wrong when requesting the contacts");
    return null
  });
  return getQryData(asyncOperation, paramQryContacts.name);
};

export async function getOwnId(token: string) {
  const paramQryOwnId: queryData = {
    name: "getOwnProfile",
    type: queryType.Query,
    params: [
      "id"
    ]
  };
  const qryConfig:AxiosRequestConfig = {
    headers: {
      Cookie: `${token};`
    },
    url: INFO_URL,
    method: "POST"
  };
  const qry = buildQuery(paramQryOwnId)
  const request = getRequest({query: qry})(qryConfig)
  const asyncOperation = await makeRequest(request)
  .catch(function(reason){
    console.error(reason, "Something wrong when requesting your own id");
    return null
  });
  return getQryData(asyncOperation, paramQryOwnId.name);
};

// export function getOwnActions

/* ---------LOCAL FUNCTIONS --------- */

function getQryData(response: AxiosResponse | null, operation: string) {
  if(!response) return null;
  const dataProp = response.data;
  console.log(dataProp);
  if("data" in dataProp && operation in dataProp["data"]) return dataProp["data"][operation];
  return null;
};