import { typeApproval, typeRegistered } from './types';
import { register, login } from './mutations';
import { info } from './queries';

export const resolvers = {
  Approval: {
    user: (parent: typeApproval) =>parent.user,
    password: (parent:typeApproval) => parent.password,
  },
  Registered: {
    nickname: (parent: typeRegistered) => parent.nickname,
    email: (parent: typeRegistered) => parent.email,
  },
  User: {
    id: (parent:{id:string;}) => parent.id,
  },
  Query: {
    info
  },
  Mutation: {
    register,
    login
  },
};  
