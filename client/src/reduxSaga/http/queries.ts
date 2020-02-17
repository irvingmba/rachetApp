
interface queryData {
  type: queryType;
  name: string;
  args?: {
    name: string;
    data: string;
  }[],
  params?: string[];
};

enum queryType {
  Mutation = "mutation",
  Query = "query"
};

function buildQuery(objQuery:queryData){
  return function(addArgs:(x:queryData)=>Function) {
    return function(addParams: (x:queryData)=>Function) {
      return `${objQuery.type}{${addArgs(objQuery)()}${addParams(objQuery)()}}`;
    };
  };
};

function addArgs({name, args}:queryData) {
  if(!args) return function(){
    return name;
  };
  let msg =name.concat("(\n");
  for(let arg of args){
    msg = msg.concat(`${arg.name}: "${arg.data}"`,"\n");
  };
  msg = msg.concat(")");
  return function() {
    return msg;
  };
};

function addParameters({params}:queryData) {
  if(!params) return () => "";
  let msg = "{\n";
  for(let param of params) {
    msg = msg.concat(param,"\n");
  };
  msg = msg.concat("}");
  return function(){
    return msg;
  };
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
  const query = buildQuery(objData)(addArgs)(addParameters);
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
  const query2 = buildQuery(objData)(addArgs)(addParameters);
    return {query: query2};
  };
  
export interface IdataRegistry {
  name: string;
  UserID: string;
  birthday: string;
  email: string;
  password: string;
};