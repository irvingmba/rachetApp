import { IntPublicFace, IntContext } from './types';
import { validEmail, validNickname } from './validation/validation';
import { getID } from './Authentication/authentication';
import { addContact as addDBContact, getContacts, addContactRegistry, contactExist, deleteContact } from '../../DBinfo/functions';

export const addContact = async (parent: undefined, args:IntPublicFace, context: IntContext) => {
  const idOwner:string = getID(context),
  {id, nickname, email} = validatePublicFace(args);
  const {owner, friend, contacts, exist} = await contactExist(idOwner,{id, nickname, email});
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