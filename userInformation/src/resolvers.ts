import { IntUserInfo } from './types';

export const resolvers = {
  Query: {
    info: () => `Dark side`,
    getOwnProfile: (parent:undefined,args:undefined, context:IntUserInfo[]) => {
      context.find
      return `test`
    },
  },
  User: {
    id: () => `test`
  },
};  
