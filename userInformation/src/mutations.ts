import { IntPublicFace, IntContext, InArgsAddAction } from './types';
import { validEmail, validNickname, validInputString, validInputDate } from './validation/validation';
import { getID, authenticate } from './Authentication/authentication';
import { addContact as addDBContact, getContacts, addContactRegistry, contactExist, deleteContact, saveRegistry, getUserByIp, findUser, incActionInDB } from './DBinfo/functions';
import { Iregistry } from './DBinfo/types';

/* -------- Exported functions to the resolvers ------------- */

export const addContact = async (parent: undefined, args:IntPublicFace, context: IntContext) => {
  const idOwner:string = getID(context),
  {id, nickname, email} = validatePublicFace(args);
  if(!idOwner) throw "Code 14: Invalid token";
  const refOwner = await getUserByIp(idOwner);
  const {owner, friend, contacts, exist} = await contactExist(refOwner?.id ,{id, nickname, email});
  if(owner && friend && owner.id == friend.id){
    return false;
  };
  if(owner && friend && contacts){
    if(exist) {
      return false;
    };
    const res = await addDBContact(friend,contacts);
    return res ? true : false;
  };
  if(owner && friend && !contacts){
    const registered = await addContactRegistry(owner,friend);
    return registered ? true : false;
  };
  return false;
};

export const delContact = async (parent: undefined, args:IntPublicFace, context: IntContext) => {
  const idOwner:string = getID(context);
  if(!idOwner) throw "Code 14: Invalid token";
  const {id, nickname, email} = validatePublicFace(args);
  const {owner,friend,contacts,exist} = await contactExist(idOwner,{id, nickname, email});
  if(!exist) {
    return false;
  };
  if( contacts && friend){
    const nContacts = await deleteContact(contacts,friend.id);
    return nContacts ? true : false;
  };
  throw "Code 24: Invalid user"
};

export async function addUser(parent:undefined, args:IntPublicFace , context:IntContext) {
  const idOwner: string = args.token ? await authenticate(args.token) : "";
  if(!idOwner) throw "Code 14: Invalid token";
  const data = {
    name: args.name ? validInputString(args.name) : "",
    nickname: args.nickname ? validNickname(args.nickname) : "",
    email: args.email ? validEmail(args.email) : "",
    birthday: args.birthday ? validInputDate(args.birthday) : ""
  };
  const dataRegistry:Iregistry = {
    name: data.name,
    nickname: data.nickname,
    email: data.email,
    birthday: data.birthday,
    access: idOwner
  };
  const registry = await saveRegistry(dataRegistry);
  return registry ? true : false;
};

export async function addAction(parent: undefined, args: InArgsAddAction, context: IntContext) {
  const authId = getID(context);
  if(!authId) throw "Code 14: Invalid token";
  const userId = args.id;
  if(!userId) return false;
  const user = await findUser({idAccess:userId});
  if(!user) return false;
  if(user.idActions) return false;
  const action = args.idAction ?
  await incActionInDB(args.idAction, user) : null;
  return action ? true : false;
};

/** Internal functions */

const validatePublicFace = (args:IntPublicFace) => {
  const id:string = args.id ? args.id : "",
  nickname:string = args.nickname ? validNickname(args.nickname) : "",
  email:string = args.email ? validEmail(args.email) : "";
  return {
    id,
    nickname,
    email
  };
};