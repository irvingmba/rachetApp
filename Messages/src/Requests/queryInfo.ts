import { buildQuery, queryData, queryType } from "../utils/queryBuilder";
import { getRequest, makeRequest } from "../utils/gralFns";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { INFO_URL } from "../globals";
import { createNewUserAction, getUserAction, getConversation } from "../../../DBmessages/functions";
import { pushConvo2DB } from "./mutateInfo";
import { IMdUserActions } from "../../../DBmessages/types";

/**
 * Takes the authentication cookie and asks the contacts ids
 * @token Authentication cookie
 * @returns A string array containing all the contacts ids
 */
async function getOwnContacts(token: string) {
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

export function memoContacts(token: string){
  let contacts = getOwnContacts(token);
  return function reqContactsAgain(reload?: boolean){
    if(!reload) return contacts;
    contacts = getOwnContacts(token);
    return contacts
  };
};

export async function getOwnInfo(token: string) {
  const paramQryOwnId: queryData = {
    name: "getOwnProfile",
    type: queryType.Query,
    params: [
      "id",
      "name",
      "nickname",
      "birthday",
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
export async function memoConvos(getAction:(reaload?: boolean | undefined) => Promise<IMdUserActions>) {
  let action = await getAction(true);
  let convosDBAsync = action.IDconversations.map(
    function getConvoInfo(convo) {
      return getConversation(convo.toHexString());
    }
  );
  let convosDB = await Promise.all(convosDBAsync);

  return async function reloadConvos(reload?: boolean) {
    if(!convosDB) throw "Something went wrong while trying to retrieve the conversations from the database";
    if(!reload) return convosDB;
    action = await getAction(true);
    convosDBAsync = action.IDconversations.map(
      function getConvoInfo(convo) {
        return getConversation(convo.toHexString());
      }
    );
    convosDB = await Promise.all(convosDBAsync);
    if(!convosDB) throw "Something went wrong while trying to retrieve the conversations from the database";
    return convosDB;
  };
};



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

function checkOwnActions(getAction: typeof getOwnActions) {
  return function prepareToken(token: string){
    return async function retrnAnActionRecord(id: string | null) {
      if(!id) throw "Trying to get the action Id from a user without ID"
      const actionId = await getAction(token, id);
      let action = actionId ? await getUserAction(actionId) : null;
      if(!action){
        action = await createNewUserAction();
        if(!action) throw "An error ocurred while trying to retrieve the information";
        // send the action id to the information database
        const respPush = await pushConvo2DB(id,action.id,token);
        if(!respPush) throw "Something went wrong while trying to push the conversation id into the information database";
      };
      return async function reloadAction(reload?: boolean) {
        if(!reload && action) return action;
        action = await getUserAction(actionId);
        if(!action) throw "The server could not get or generate a user action";
        return action
      };
    };
  };
};
