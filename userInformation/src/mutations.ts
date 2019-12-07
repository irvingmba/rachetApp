import { IntPublicFace, IntContext } from './types';
import { validEmail, validNickname } from './validation/validation';

export const addContact = (parent: undefined, args:IntPublicFace, context: IntContext) => {
    const contact = context.userAccess.find((user) => args.id ? user.id == args.id: args.nickname ? user.nickname == args.nickname : args.email ? user.email == args.email : null),
    owner = context.contactInfo.find((user) => user.id == "1"),
    exist = owner ? owner.contacts.some((user) =>user == (contact ? contact.id : null)) : null;
    if (owner && contact && !exist) {
      owner.contacts = [...owner.contacts, contact.id];
      return true;
    }
    else if(!exist) {
      return false;
    };
    throw "Code 20: Invalid user";
};

export const delContact = (parent: undefined, args:IntPublicFace, context: IntContext) => {
    args.nickname = validNickname(args.nickname);
    args.email = validEmail(args.email);
    const contact = context.userAccess.find((user) => args.id ? user.id == args.id: args.nickname ? user.nickname == args.nickname : args.email ? user.email == args.email : null),
    owner = context.contactInfo.find((user) => user.id == "1"),
    exist = owner ? owner.contacts.some((user) =>user == (contact ? contact.id : null)) : null;
    if(owner && contact && !exist) {
      owner.contacts.splice(owner.contacts.indexOf(contact.id),1);
      return true;
    }
    else if(!exist) {
      return false;
    };
    throw "Code 21: Invalid user";
};