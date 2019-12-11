import { IntPublicFace, IntContext } from './types';
import { validEmail, validNickname } from './validation/validation';
import { getID } from './Authentication/authentication';
import { findUser, addDBContact, delDBContact } from '../../DBaccess/functions';

export const addContact = async (parent: undefined, args:IntPublicFace, context: IntContext) => {
  const idOwner:string = getID(context);
  const {id, nickname, email} = validatePublicFace(args);
  const newContact = await findUser({id,nickname,email});
  if(newContact){
    const res = addDBContact(idOwner,newContact._id);
    return res;
  };
  throw "Code 20: Invalid user";
};

export const delContact = async (parent: undefined, args:IntPublicFace, context: IntContext) => {
  const idOwner:string = getID(context);
  const {id, nickname, email} = validatePublicFace(args);
  const res = await delDBContact(idOwner,{id,nickname,email});
  return res;
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