import { SchemUser } from './types';

export const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    getUser: (parent:{} ,args:{name:string},context:SchemUser[])=>{
      return context.find((user)=>user.name===args.name);
    },
  },
  User: {
    id: (parent:SchemUser)=>parent.id,
    name: (parent:SchemUser)=>parent.name,
    nickname: (parent:SchemUser)=>parent.nickname,
    birthday: (parent:SchemUser)=>parent.birthday,
    email: (parent:SchemUser)=>parent.email,
},
}; 