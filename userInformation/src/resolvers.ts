import { IntUser, IntPublicFace } from './types';
import { getOwnProfile, getContacts, getContactInfo } from './queries';
import { addContact,delContact } from './mutations';

export const resolvers = {
  Query: {
    info: () => `Dark side`,
    getOwnProfile,
    getContacts,
    getContactInfo,
  },
  Mutation: {
    addContact,
    delContact,
  },
  User: {
    name: (parent: IntUser) => parent.name,
    nickname: (parent: IntUser) => parent.nickname,
    birthday: (parent: IntUser) => parent.birthday,
    email: (parent: IntUser) => parent.email,
  },
  publicFace: {
    nickname: (parent:IntPublicFace) => parent.nickname,
    email: (parent: IntPublicFace) => parent.email,
  },
};
