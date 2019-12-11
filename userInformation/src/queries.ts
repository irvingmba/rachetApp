import { IntContext } from './types';
import { getID } from './Authentication/authentication';
import { findUser, findInfo, objectToString } from '../../DBaccess/functions';

export const getOwnProfile = async (parent: undefined, args: undefined, context: IntContext) => {
  const id = getID(context);
  const user = await findUser({id}),
  info = user ? await findInfo(user.userInfo.toHexString()) : null;
  if(user && info) {
    return {
      name: info.Name,
      nickname: user.Nickname,
      birthday: info.Birthday,
      email: user.Email,
    };
  };
  throw "Code 24: Invalid user"
};

export const getContacts = (parent: undefined, args: undefined, context: IntContext) => {
  const id = getID(context);
  return findOwnerContact(id,context);
};

export const getContactInfo = (parent: undefined, args: { id: string }, context: IntContext) => {
  const id = getID(context);
  const found = findOwnerContact(id,context,args.id);
  if( found ) {
    return getProfile( args.id, context );
  };
  return null;
};

/** Helpers */

const getProfile = (id: string, context: IntContext) => {
  const found = context.userInfo.find((user) => user.id === id);
  const afound = context.userAccess.find((user) => user.id === id);
  if (found && afound ) {
    return {
      id: found.id,
      name: found.name,
      nickname: afound.nickname,
      birthday: found.name,
      email: afound.email,
    };
  };
  return null;
};

const findOwnerContact = (id: string, context:IntContext, idContact?: string) => {
  const found = context.contactInfo.find((user) => user.id === id);
  if (found) {
    const idContacts = [...found.contacts];
    if(idContact){
      const contactFound = context.userAccess.find((contact)=>contact.id === idContact);
      return contactFound ? { id: contactFound.id, nickname: contactFound.nickname, email: contactFound.email } : null;
    };
    return idContacts.map((value) => {
      const contact = context.userAccess.find((user) => user.id === value);
      return contact ? { id: contact.id, nickname: contact.nickname, email: contact.email } : null;
    });
  };
  return null;
};