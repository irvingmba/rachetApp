import { mdUserInfo } from './schema';
import { Iregistry, ImdUserInfo } from './types';

export async function saveRegistry(data: Iregistry){
    const user = new mdUserInfo({
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        birthday: data.birthday,
        idPassword: data.password,
    });
    const sUser = await user.save();
    return sUser;
}; 

/**
 * Check if a record with the given parameter exists
 * @param {object} filter Object wich sends the values to search in the database
 * @param {string} filter nk - Nickname
 * @param {string} filter e - Email
 */
export async function existUserInfo(filter:{nk?:string;e?:string;}){
    if(filter){
        const exist = await mdUserInfo.exists({...filter})
        return exist;
    };
    return null;
};

/**
 * Finds a user, if the id is given, the function ignores all the other data
 * @param condition id - User id
 * @param condition nk - Nickname
 * @param condition e - email
 */
export async function findUser( condition:{id?: string; nk?: string; e?:string;} ){
    if(condition.id){
        const user = await mdUserInfo.findById(condition.id);
        return user;
    }
    const doc = {...condition};
    if(doc){
        const user = await mdUserInfo.find(doc);
        return user ? user.shift() : null;
    };
    return null
};

export async function addContact(owner:ImdUserInfo,friend:ImdUserInfo){
    const res = await mdUserInfo.findOneAndUpdate({_id:owner.id},{$push: {idPassword: friend.id}});
    console.log(res);
    return res;
};