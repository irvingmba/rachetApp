import { IntContext, resToken } from './types';
import { authenticate } from './Authentication/authentication';

export const getOwnProfile = async (parent:undefined,args:undefined, context:IntContext) => {
  const cookie:{token:string} = context.request.cookies;
  console.log(cookie);
  const res = await authenticate(cookie.token);
  console.log(res);
  // const userID = res.data.tkn.id;
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
  throw "Code 30: Authentication not accomplished";
};

export const getContacts = (parent: undefined, args: undefined, context: IntContext) => {
    const found = context.contactInfo.find((user) => user.id == "1");
    if (found) {
      const idContacts = [...found.contacts];
      return idContacts.map((value) => {
        const contact = context.userAccess.find((user) =>user.id==value);
        return contact ? {id: contact.id, nickname: contact.nickname, email: contact.email} : null;
      });
    };
    return null;
};

export const getContactInfo = (parent: undefined, args: {id: string}, context: IntContext)=> {
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
};