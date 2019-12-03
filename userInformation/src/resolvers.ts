import { IntUserInfo, IntUserAccess, IntUser } from './types';

export const resolvers = {
  Query: {
    info: () => `Dark side`,
    getOwnProfile: (parent:undefined,args:undefined, context:{userInfo: IntUserInfo[], userAccess: IntUserAccess[]}) => {
      context.userAccess
      return `test`
    },
  },
  User: {
    id: (parent: IntUser) => parent.id,
    name: (parent: IntUser) => parent.name,
    nickname: (parent: IntUser) => parent.nickname,
    birthday: (parent: IntUser) => parent.birthday,
    email: (parent: IntUser) => parent.email,
  },
};  
