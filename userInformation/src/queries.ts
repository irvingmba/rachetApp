import { IntContext } from './types';
import { getID } from './Authentication/authentication';
import { findUser, getContacts as getDBcontacts, contactPublicData, contactExist } from  '../../DBinfo/functions';
import { validNickname } from './validation/validation';

export const getOwnProfile = async (parent: undefined, args: undefined, context: IntContext) => {
  const id = getID(context);
  const user = await findUser({id});
  if(user) {
    return {
      name: user.name,
      nickname: user.nickname,
      birthday: user.birthday,
      email: user.email,
    };
  };
  throw "Code 24: Invalid user"
};

export const getContacts = async (parent: undefined, args: undefined, context: IntContext) => {
  const id = getID(context),
  owner = await findUser({id}),
  colContacts = owner ? await getDBcontacts(owner.idContacts ? owner.idContacts.toHexString() : "") : null,
  dataContacts = colContacts ? await contactPublicData(colContacts) : null;
  return dataContacts;
};

export const getContactInfo = async (parent: undefined, args: { nickname: string }, context: IntContext) => {
  const id = getID(context),
  vNickname = validNickname(args.nickname),
  {owner, friend, contacts, exist} = await contactExist(id,{nickname:vNickname});
  if(exist && friend) {
    return {
      name: friend.name,
      nickname: friend.nickname,
      email: friend.email,
      birthday: friend.birthday
    };
  };
  throw "Code 24: Invalid user"
};

/** Helpers */
