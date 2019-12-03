import { IntUserInfo, MUser, MLogin, IntUserAccess } from './types';
import { validInputString, validInputDate, validInputEmail, validInputPass } from './validation';

export const resolvers = {
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
        nickname: validInputString(args.nickname),
        password: validInputPass(args.password),

      };
      context.userInfo.push(registerUser),
      context.userAccess.push(registerAccess);
      return registerUser.id;
    },
    login: (parent:undefined,args:MLogin,context:{userInfo: IntUserInfo[], userAccess: IntUserAccess[]})=>{
      const userFound:boolean=context.userAccess.some((user)=>{
        if((user.nickname===args.user)&&(user.password===args.password)){
          return true;
        };
        return false;
      });
      return userFound;
    }
  },
};  
