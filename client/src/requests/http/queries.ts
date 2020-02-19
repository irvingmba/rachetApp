import { queryData, addParameters, addArgs, buildQuery, queryType  } from "../../utils/queryBuilder";

const GET_CONTACTS = "getContacts",
GET_OWN_PROFILE = "getOwnProfile",
GET_CONTACT_INFO = "getContactInfo";

// function to query the list of contacts from the server
export function qryContactList(){
  let objData:queryData = {
    type: queryType.Query,
    name: GET_CONTACTS,
    params: [
      "nickname",
      "email"
    ]
  };
  return {query : buildQuery(objData)};
};
  
export function qryGetOwnProfile(){
  let objData:queryData = {
    type: queryType.Query,
    name: GET_OWN_PROFILE,
    params: [
      "name",
      "nickname",
      "birthday",
      "email"
    ]
  };
  return {query : buildQuery(objData)};
};

export function qryGetContactInfo(nickname: string){
  let objData:queryData = {
    type: queryType.Query,
    name: GET_CONTACT_INFO,
    args: [{
      name: "nickname",
      data: nickname
    }],
    params: [
      "name",
      "nickname",
      "birthday",
      "email"
    ]
  };
  return {query : buildQuery(objData)};
};
