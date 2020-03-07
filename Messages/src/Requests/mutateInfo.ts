import { buildQuery, queryData, queryType } from "../utils/queryBuilder";
import { getRequest, makeRequest } from "../utils/gralFns";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { INFO_URL } from "../globals";

export async function pushConvo2DB(userId:string, actionId:string, token: string) {
  const cfgPushQry:queryData = {
    name: "addAction",
    type: queryType.Mutation,
    args: [{
      name: "id",
      data: userId
    }, {
      name: "idAction",
      data: actionId
    }]
  };
  const qryConfig:AxiosRequestConfig = {
    headers: {
      Cookie: `${token};`
    },
    url: INFO_URL,
    method: "POST"
  };
  const qry = buildQuery(cfgPushQry)
  const request = getRequest({query: qry})(qryConfig)
  const asyncOperation = await makeRequest(request)
  .catch(function(reason){
    console.error(reason, "Something wrong when pushing the conversation id to the information database");
    return null
  });
  return getQryData(asyncOperation, cfgPushQry.name);
};

/* ----- LOCAL FUNCTIONS -------- */

function getQryData(response: AxiosResponse | null, operation: string) {
  if(!response) return null;
  const dataProp = response.data;
  console.log(dataProp);
  if("data" in dataProp && operation in dataProp["data"]) return dataProp["data"][operation];
  return null;
};