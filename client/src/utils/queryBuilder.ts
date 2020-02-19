export interface queryData {
  type: queryType;
  name: string;
  args?: {
    name: string;
    data: string;
  }[],
  params?: string[];
};

export enum queryType {
  Mutation = "mutation",
  Query = "query"
};

export function buildQuery(objQuery:queryData){
  return `${objQuery.type}{${addArgs(objQuery)()}${addParameters(objQuery)()}}`;
};

export function addArgs({name, args}:queryData) {
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

export function addParameters({params}:queryData) {
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