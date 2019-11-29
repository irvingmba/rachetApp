import { SchemUser, MUser, MLogin } from './types';

export const resolvers = {
  User: {
    id: (parent:SchemUser)=>parent.id,
    name: (parent:SchemUser)=>parent.name,
    nickname: (parent:SchemUser)=>parent.nickname,
    birthday: (parent:SchemUser)=>parent.birthday,
    email: (parent:SchemUser)=>parent.email,
  },
  // signinUser: {
  //   user: (parent:{})=>true,
  //   password: (parent:{})=>true,
  // },
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
        name: args.name,
        nickname: args.nickname,
        birthday: args.birthday,
        email: args.email,
        password: args.password
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