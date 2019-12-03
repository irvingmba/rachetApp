import { IntUserInfo, IntUserAccess, IntUser, IntContactInfo } from './types';

export const resolvers = {
  Query: {
    info: () => `Dark side`,
    getOwnProfile: (parent:undefined,args:undefined, context:{userInfo: IntUserInfo[], userAccess: IntUserAccess[], contactInfo:IntContactInfo}) => {
      const found = context.userInfo.find((user) => user.id == "1");
      const afound = context.userAccess.find((user) => user.id == "1");
      if (found && afound) {
        return {
          id: found.id,
          name: found.name,
          nickname: afound.nickname,
          birthday: found.name,
          email: found.email,
        };
      };
      return null;
    },
    getContacts: () => `test`
  },
  User: {
    id: (parent: IntUser) => parent.id,
    name: (parent: IntUser) => parent.name,
    nickname: (parent: IntUser) => parent.nickname,
    birthday: (parent: IntUser) => parent.birthday,
    email: (parent: IntUser) => parent.email,
  },
};  
