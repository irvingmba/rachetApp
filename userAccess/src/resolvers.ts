import { IntUserInfo, MUser, MLogin, IntUserAccess, typeApproval } from './types';
import { validInputString, validInputDate, validInputEmail, validInputPass, validInputNickname } from './validation/validation';
import { encryptPswd, comparePswd } from './Authentication/encryption';

export const resolvers = {
  Approval: {
    user: (parent: typeApproval) =>parent.user,
    password: (parent:typeApproval) => parent.password,
  },
  Query: {
    info: () => `Dark side`,
  },
  Mutation: {
    register: (parent:undefined,args:MUser, context:{userInfo: IntUserInfo[],userAccess: IntUserAccess[]})=>{
      const registerUser:IntUserInfo = {
        id: (context.userAccess.length+1).toString(),
        name: validInputString(args.name),
        birthday: validInputDate(args.birthday),
        email: validInputEmail(args.email),
      };
      const registerAccess:IntUserAccess = {
        id: registerUser.id,
        nickname: validInputNickname(args.nickname),
        password: encryptPswd(validInputPass(args.password)),

      };
      context.userInfo.push(registerUser),
      context.userAccess.push(registerAccess);
      return registerUser.id;
    },
    login: (parent:undefined,args:MLogin,context:{userInfo: IntUserInfo[], userAccess: IntUserAccess[]})=>{
      const userFound = context.userAccess.some((user)=>{
          return {
            user: user.nickname===args.user,
            password: comparePswd( user.password, args.password ),
          };
      });
      return userFound;
    }
  },
};  
