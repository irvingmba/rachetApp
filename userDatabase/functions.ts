import mongoose from 'mongoose';
import { userAccess, userInfo, contacts } from './schema';
import { IcompRegistry, IpublicInfo, IMuserAccess, IMuserInfo } from './types';

export async function saveRegistry(record:IcompRegistry){
    const user:IMuserInfo = new userInfo({
        Name: record.name,
        Birthday: record.birthday
    });
    const pUser = await user.save();
    const access = new userAccess({
        Nickname: record.nickname,
        Email: record.email,
        Password: record.password,
        userInfo: pUser._id
    });
    const pAccess = await access.save();
    return pAccess._id;
};

export async function noDuplicate(user:IpublicInfo) {
    const foundNick = await userAccess.find({Nickname: user.nickname});
    const foundEmail = await userAccess.find({Email: user.email});
    return {
        nickname: foundNick.length ? true : false,
        email: foundEmail.length ? true: false
    };
};

export async function userPassword(nickname:string){
    const found = await userAccess.find({Nickname: nickname});
    return found;
};

export async function findUser( condition:{id?: string; nickname?: string; email?:string;} ){
    if(condition.id){
        const doc = {_id: condition.id}
        const user = await userAccess.find(doc);
        return user ? user.shift() : null;
    }
    const doc = {...condition};
    if(doc){
        const user = await userAccess.find(doc);
        return user ? user.shift() : null;
    };
    return null
};

export async function findContacts(userId: string){
    const users = await userAccess.find({_id: userId}),
    user = users ? users.shift() : null;
    if(user) {
        const contact = contacts.find({_id: user.contacts});
        return contact;
    };
    return null;
};

export async function addDBContact(IDowner:string,IDcontact:string){
    const {exist,IdContacts} = await contactExists(IDowner,{id: IDcontact});
    if(!exist){
        IdContacts.Contacts.push(IDcontact);
        await IdContacts.save();
        return true;
    };
    return false;
};

export async function contactExists(idTarget:string, idContact:{id?:string;nickname?:string;email?:string;}){
    const foundArr = await findContacts(idTarget),
    target = foundArr ? foundArr.shift() : null,
    contact = target ? await findUser({
        id: idContact.id, 
        nickname: idContact.nickname, 
        email: idContact.email
    }): null;
    if(target && contact) {
        const exist = target.Contacts.some((user)=>user === contact._id);
        return {
            exist,
            IdContacts: target,
            contact
        };
    };
    throw "Code 40: Target or contact doesn't exist";
};

export async function delDBContact(IDowner: string, IDcontact:{id?:string;nickname?:string;email?:string;} ){
    const {exist,IdContacts,contact} = await contactExists(IDowner,IDcontact);
    if(exist){
        IdContacts.Contacts.splice(IdContacts.Contacts.indexOf(contact._id),1);
        await IdContacts.save();
        return true;
    };
    return false;
};

export async function findInfo(IDinfo: string){
    const info = await userInfo.findById(IDinfo)
    return info;
};

export function objectToString(object:mongoose.Types.ObjectId){
    return object.toHexString();
};