import { queryData, addParameters, addArgs, buildQuery, queryType  } from "../../utils/queryBuilder";

// function to query the list of contacts from the server
function qryContactList(){
  let objData:queryData = {
    type: queryType.Query,
    name: "getContacts",
    params: [
      "nickname",
      "email"
    ]
  };
};