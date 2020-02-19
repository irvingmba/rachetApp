
import { queryData, addParameters, addArgs, buildQuery, queryType  } from "../../utils/queryBuilder";

function copyProps(obj:{[x:string]:string}){

};
/**
 * Function that takes the data and builds a query to mutate the login
 * @param data It's an object with the user and the password to build the query
 */
export const mutationLogin = (data:{user:string;password:string}) => {
  const objData:queryData = {
    type: queryType.Mutation,
    name: "login",
    args: [{
      name: "user",
      data: data.user
    }, {
      name: "password",
      data: data.password
    }],
    params: [
      "user",
      "password"
    ]
  };
  const query = buildQuery(objData);
  return {query};
};


/**
 * Function to send the data from the registry form to the server
 * @param data Object that contains the data
 */
export const mutationRegistry = (data:IdataRegistry) => {
  const objData:queryData = {
    type: queryType.Mutation,
    name: "register",
    args: [{
      name: "name",
      data: data.name
    }, {
      name: "nickname",
      data: data.UserID
    }, {
      name: "birthday",
      data: data.birthday
    }, {
      name: "email",
      data: data.email
    }, {
      name: "password",
      data: data.password
    }],
    params: [
      "nickname",
      "email"
    ]
  };
  const query2 = buildQuery(objData);
    return {query: query2};
  };
  
export interface IdataRegistry {
  name: string;
  UserID: string;
  birthday: string;
  email: string;
  password: string;
};

/**
 * Function that takes the data from an object and returns an object with the mutation for Graphql
 * @param param0 
 */
export function mutAddContact({id, nickname, email}: contactId){
  let args = [{
    name: "id",
    data: id ? id : undefined
  }, {
    name: "nickname",
    data: nickname ? nickname: undefined
  }, {
    name: "email",
    data: email ? email : undefined
  }].reduce(function(acc:{name:string; data:string;}[],val){
    if(typeof val.data === undefined) {
      return acc;
    }
    else {
      return [...acc, {name: val.name, data: val.data ? val.data : ""}];
    };
  }, []);
  const objData:queryData = {
    type: queryType.Mutation,
    name: "addContact",
    args,
  };
  const query = buildQuery(objData);
  return {query};
};

export interface contactId{
  id?: string;
  nickname?: string;
  email?: string;
};
