import { SchemUser, MUser, MLogin } from './types';
import { validInputString, validInputDate, validInputEmail, validInputPass } from './validation';

export const resolvers = {
  User: {
    id: (parent:SchemUser)=>parent.id,
    name: (parent:SchemUser)=>parent.name,
    nickname: (parent:SchemUser)=>parent.nickname,
    birthday: (parent:SchemUser)=>parent.birthday,
    email: (parent:SchemUser)=>parent.email,
  },
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    getUser: (parent:undefined ,args:{id:string},context:SchemUser[])=>{
      return context.find((user)=>user.id===args.id);
    },
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
