import { typeApproval } from './types';
import { register, login } from './mutations';
import { tkn } from './queries';

export const resolvers = {
  Approval: {
    user: (parent: typeApproval) =>parent.user,
    password: (parent:typeApproval) => parent.password,
  },
  User: {
    id: (parent:any) => parent.id,
  },
  Query: {
    info: () => `Dark side`,
    tkn, 
  },
  Mutation: {
    register,
    login
  },
};  
