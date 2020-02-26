import { buildQuery, queryData, queryType } from "../utils/queryBuilder";


export function lazyQryTkn(token: string){
  const objTkn:queryData = {
    type: queryType.Query,
    name: "tkn",
    args: [{
      name: "key",
      data: token
    }],
    params: ["id"]
  };
  return buildQuery(objTkn);
};
