import { buildQuery, queryData, queryType } from "../utils/queryBuilder";
import { getRequest, makeRequest } from "../utils/gralFns";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { INFO_URL } from "../globals";
import { createNewUserAction, getUserAction } from "../../../DBmessages/functions";
import { pushConvo2DB } from "./mutateInfo";

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
      "id",
      "nickname",
      "email"
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

export const searchActionId = checkOwnActions(getOwnActions);





/* ---------LOCAL FUNCTIONS --------- */

function getQryData(response: AxiosResponse | null, operation: string) {
  if(!response) return null;
  const dataProp = response.data;
  console.log(dataProp);
  if("data" in dataProp && operation in dataProp["data"]) return dataProp["data"][operation];
  return null;
};

async function getOwnActions(token: string, id: string) {
  const paramQryOwnAction: queryData = {
    name: "getUserActions",
    type: queryType.Query,
    args: [{
      name: "id",
      data: id
    }]
  };
  const qryConfig:AxiosRequestConfig = {
    headers: {
      Cookie: `${token};`
    },
    url: INFO_URL,
    method: "POST"
  };
  const qry = buildQuery(paramQryOwnAction)
  const request = getRequest({query: qry})(qryConfig)
  const asyncOperation = await makeRequest(request)
  .catch(function(reason){
    console.error(reason, "Something wrong when requesting your action id");
    return null
  });
  return getQryData(asyncOperation, paramQryOwnAction.name);
};

export function checkOwnActions(getAction: typeof getOwnActions) {
  return async function retrnAnActionRecord(token: string, id: string | null) {
    if(!id) throw "Trying to get the action Id from a user without ID"
    const actionId = await getAction(token, id);
    if(actionId) {
      const action = await getUserAction(actionId);
      if(!action) throw "Action not found in the messages database";
      return action;
    };
    const nwAction = await createNewUserAction();
    if(!nwAction) throw "An error ocurred while trying to retrieve the information";
    // send the action id to the information database
    const respPush = await pushConvo2DB(id,nwAction.id,token);
    if(!respPush) throw "Something went wrong while trying to push the conversation id into the information database";
    return nwAction;
  };
};