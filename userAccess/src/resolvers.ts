import { IntUserInfo, MUser, MLogin, IntUserAccess, typeApproval, IntContext } from './types';
import { validInputString, validInputDate, validInputEmail, validInputPass, validInputNickname } from './validation/validation';
import { encryptPswd, comparePswd } from './Authentication/encryption';
import { sign } from './Authentication/authentication';

export const resolvers = {
  Approval: {
    user: (parent: typeApproval) =>parent.user,
    password: (parent:typeApproval) => parent.password,
  },
  Query: {
    info: () => `Dark side`,
  },
  Mutation: {
    register: (parent:undefined,args:MUser, context:IntContext)=>{
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
    login: (parent:undefined,args:MLogin,context:IntContext)=>{
      const userFound = context.userAccess.find((user) => user.nickname===validInputNickname(args.user));
      if (userFound){
        const password = comparePswd( args.password, userFound.password );
        if( password ){
          context.response.cookie(
            "token",
            sign(userFound.id),
            {expires: new Date(Date.now()+(1*60*60*1000))}
          );
        };
        return {
          user: true,
          password,
        };
      };
      return {
        user: false,
        password: false
      };
    }
  },
};  
