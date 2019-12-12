import { IntPublicFace, IntContext } from './types';
import { validEmail, validNickname } from './validation/validation';
import { getID } from './Authentication/authentication';
import { findUser, addContact as addDBContact } from '../../DBinfo/functions';

export const addContact = async (parent: undefined, args:IntPublicFace, context: IntContext) => {
  const idOwner:string = getID(context),
  {id, nickname, email} = validatePublicFace(args),
  owner = await findUser({id:idOwner}),
  friend = await findUser({id,nk:nickname,e:email});
  if(owner && friend){
    const exist = owner.idContacts.some((contact)=>contact===friend.id);
    if(exist) {
      return false;
    };
    addDBContact(owner,friend);
  };

};

export const delContact = async (parent: undefined, args:IntPublicFace, context: IntContext) => {
  // const idOwner:string = getID(context);
  // const {id, nickname, email} = validatePublicFace(args);
  // const res = await delDBContact(idOwner,{id,nickname,email});
  // return res;
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