import { typeApproval } from './types';
import { register, login } from './mutations';

export const resolvers = {
  Approval: {
    user: (parent: typeApproval) =>parent.user,
    password: (parent:typeApproval) => parent.password,
  },
  Query: {
    info: () => `Dark side`,
  },
  Mutation: {
    register,
    login
  },
};  
