import { SchemUser, MUser, MLogin } from './types';
import { validInputString, validInputDate, validInputEmail, validInputPass } from './validation';

export const resolvers = {
  Query: {
    info: () => `Dark side`,
  },
  Mutation: {
    register: (parent:undefined,args:MUser, context:SchemUser[])=>{
      const user:SchemUser = {
        id: (context.length+1).toString(),
        name: validInputString(args.name),
        nickname: validInputString(args.nickname),
        birthday: validInputDate(args.birthday),
        email: validInputEmail(args.email),
        password: validInputPass(args.password),
      };
      context.push(user);
      return user.id;
    },
    login: (parent:undefined,args:MLogin,context:SchemUser[])=>{
      const userFound:boolean=context.some((user)=>{
        if((user.nickname===args.user)&&(user.password===args.password)){
          return true;
        };
        return false;
      });
      return userFound;
    }
  },
};  
