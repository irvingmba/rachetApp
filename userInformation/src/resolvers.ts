import { IntUser, IntPublicFace } from './types';
import { getOwnProfile, getContacts, getContactInfo, getUserActions,  } from './queries';
import { addContact, delContact, addUser, addAction } from './mutations';

export const resolvers = {
  Query: {
    info: () => `Dark side`,
    getOwnProfile,
    getContacts,
    getContactInfo,
    getUserActions,
  },
  Mutation: {
    addContact,
    delContact,
    addUser,
    addAction,
  },
  User: {
    id: (parent: IntUser) => parent.id,
    name: (parent: IntUser) => parent.name,
    nickname: (parent: IntUser) => parent.nickname,
    birthday: (parent: IntUser) => parent.birthday,
    email: (parent: IntUser) => parent.email,
  },
  publicFace: {
    id: (parent: IntPublicFace) => parent.id,
    nickname: (parent:IntPublicFace) => parent.nickname,
    email: (parent: IntPublicFace) => parent.email,
  },
};
