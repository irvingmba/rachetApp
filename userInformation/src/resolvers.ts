import { IntUserInfo, IntUserAccess, IntUser, IntContactInfo, IntPublicFace } from './types';

export const resolvers = {
  Query: {
    info: () => `Dark side`,
    getOwnProfile: (parent:undefined,args:undefined, context:{userInfo: IntUserInfo[], userAccess: IntUserAccess[], contactInfo:IntContactInfo}) => {
      const found = context.userInfo.find((user) => user.id == "1");
      const afound = context.userAccess.find((user) => user.id == "1");
      if (found && afound) {
        return {
          id: found.id,
          name: found.name,
          nickname: afound.nickname,
          birthday: found.name,
          email: afound.email,
        };
      };
      return null;
    },
    getContacts: (parent: undefined, args: undefined, context: {userInfo: IntUserInfo[], userAccess: IntUserAccess[], contactInfo: IntContactInfo[]}) => {
      const found = context.contactInfo.find((user) => user.id == "1");
      if (found) {
        const idContacts = [...found.contacts];
        return idContacts.map((value) => {
          const contact = context.userAccess.find((user) =>user.id==value);
          return contact ? {id: contact.id, nickname: contact.nickname, email: contact.email} : null;
        });
      };
      return null;
    },
    getContactInfo: (parent: undefined, args: {id: string}, context: {userInfo: IntUserInfo[], userAccess: IntUserAccess[], contactInfo: IntContactInfo[]})=> {
      const userFound = context.userInfo.find((user) => user.id == args.id);
      const accessFound = context.userAccess.find((user) => user.id == args.id);
      if (userFound && accessFound) {
        return {
          id: userFound.id,
          name: userFound.name,
          nickname: accessFound.nickname,
          birthday: userFound.birthday,
          email: accessFound.email,
        };
      };
      return null;
    },
  },
  Mutation: {
    addContact: (parent: undefined, args:IntPublicFace, context: {userInfo: IntUserInfo[], userAccess: IntUserAccess[], contactInfo: IntContactInfo[]}) => {
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
    },
    delUser: (parent: undefined, args:IntPublicFace, context: {userInfo: IntUserInfo[], userAccess: IntUserAccess[], contactInfo: IntContactInfo[]}) => {
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
    },
  },
  User: {
    id: (parent: IntUser) => parent.id,
    name: (parent: IntUser) => parent.name,
    nickname: (parent: IntUser) => parent.nickname,
    birthday: (parent: IntUser) => parent.birthday,
    email: (parent: IntUser) => parent.email,
  },
  publicFace: {
    id: (parent:IntPublicFace) => parent.id,
    nickname: (parent:IntPublicFace) => parent.nickname,
    email: (parent: IntPublicFace) => parent.email,
  },
};  
