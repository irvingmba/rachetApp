import { IntPublicFace, IntContext } from './types';
import { validEmail, validNickname } from './validation/validation';
import { getID } from './Authentication/authentication';

export const addContact = (parent: undefined, args:IntPublicFace, context: IntContext) => {
  const idOwner:string = getID(context);
  const {id, nickname, email} = validatePublicFace(args);
  const {owner, contact, exist}=checkNotContact(idOwner,{id,nickname,email},context);
  if (owner && contact && !exist) {
    owner.contacts = [...owner.contacts, contact.id];
    return true;
  }
  else if(exist) {
    return false;
  };
  throw "Code 20: Invalid user";
};

export const delContact = (parent: undefined, args:IntPublicFace, context: IntContext) => {
  const idOwner:string = getID(context);
  const {id, nickname, email} = validatePublicFace(args);
  const {owner, contact, exist}=checkNotContact(idOwner,{id,nickname,email},context);
    if(owner && contact && exist) {
      owner.contacts.splice(owner.contacts.indexOf(contact.id),1);
      return true;
    }
    else if(!exist) {
      return false;
    };
    throw "Code 21: Invalid user";
};

/** Internal functions */

const checkNotContact = (id: string, args: {id:string;nickname:string;email:string;}, context: IntContext) => {
  if(args.id || args.nickname || args.email){
    const contact = context.userAccess.find((user) => args.id ? user.id == args.id: args.nickname ? user.nickname == args.nickname : args.email ? user.email == args.email : null);
    if(contact && contact.id) {
      const owner = context.contactInfo.find((user) => user.id === id),
      exist = owner ? owner.contacts.some((user) =>user === contact.id) : false;
      return {owner, contact, exist};
    };
  };
  throw "Code 20: Invalid user";;
};

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