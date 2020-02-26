import { MUser, IntContext, MLogin } from './types';
import { validInputString, validInputDate, validInputEmail, validInputNickname, validInputPass } from './validation/validation';
import { encryptPswd,comparePswd } from './Authentication/encryption';
import { sign } from './Authentication/authentication';
import { confCookieToken } from './Authentication/cookieConfig';
import { getRecordByNickname, getRecordByEmail, createRecord } from '../../DBaccess/functions';
import { IsmUserAccess } from '../../DBaccess/types';
import axios, {AxiosRequestConfig} from "axios";
import { DEVELOPMENT_MODE, pathUserInfo } from "./index";

/**
 * Resolver that takes the args and checks if the given data is valid, if it passes the validation, it sends the data to the database to be recorded
 * @param {undefined} parent Data from the parent(not used)
 * @param {MUser} args Registry data that the resolver is going to validate and store
 * @param {IntContext} context Methods from the request and response available(not used)
 * @param return The resolver returns an object where true means that the parameter sent is valid and false means that the parameter already exists of is invalid
 */
const register = async (parent:undefined,args:MUser, context:IntContext)=>{
  const registerUser:MUser = {
    name: validInputString(args.name),
    birthday: validInputDate(args.birthday),
    nickname: validInputNickname(args.nickname),
    email: validInputEmail(args.email),
    password: encryptPswd(validInputPass(args.password)),
  },
  eNickname = await nicknameExists(registerUser.nickname),
  eEmail = await emailExist(registerUser.email);
  if(!eNickname && !eEmail) {
    const objRecord:IsmUserAccess = {
      nickname: registerUser.nickname,
      email: registerUser.email,
      password: registerUser.password,
      lastLogin: ""
    };
    const record = await createRecord(objRecord);
    const registryObj = createRegistryObj({
      token: record.id,
      name: registerUser.name,
      nickname: record.nickname,
      email: record.email,
      birthday:registerUser.birthday
    });
    const reqConfig:AxiosRequestConfig = {
      method: "POST",
      url: pathUserInfo
    };
    const requestResp = makeRequest(getRequest(buildQuery(registryObj))(reqConfig));
  };
  return {
    nickname: !eNickname,
    email: !eEmail    
  };
};



const login = async (parent:undefined,args:MLogin,context:IntContext)=>{
  const record = await getRecordByNickname(validInputNickname(args.user));
  if(record){
    const user = record,
    passMatch = comparePswd(args.password, user ? user.password : "");
    if( passMatch ){
      context.response.cookie(
        "token",
        sign({id: record.id}),
        confCookieToken
      );
    };
    return {
      user: true,
      password: passMatch
    };
  };
  return {
    user: false,
    password: false
  };
};

export { register, login };

/* --------- LOCAL FUNCTIONS ----------- */

async function nicknameExists(nickname: string) {
  const record = await getRecordByNickname(nickname);
  if(record) return true;
  return false;
};

async function emailExist(email: string) {
  const record = await getRecordByEmail(email);
  if(record) return true;
  return false;
};

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

function getRequest(query: {}){
  console.log(query);
  return function getObjConfig(config: AxiosRequestConfig):AxiosRequestConfig{
      return {
          ...config,
          data: {query}
      };
  };
};

 function makeRequest(config: AxiosRequestConfig){
  if(DEVELOPMENT_MODE) process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  return  axios(config);
};

function createRegistryObj(dataObj: IregistryObj) {
  const registerData:queryData = {
    type: queryType.Mutation,
    name: "addUser",
    args: [{
      name: "token",
      data: sign({id: dataObj.token}),
    }, {
      name: "name", 
      data: dataObj.name
    }, {
      name: "nickname",
      data: dataObj.nickname
    }, {
      name: "email",
      data: dataObj.email
    }, {
      name: "birthday",
      data: dataObj.birthday
    }],
  };
  return registerData
};

interface IregistryObj {
  token: string;
  name: string;
  nickname: string;
  email: string;
  birthday: string;
};