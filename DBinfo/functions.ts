import { mdUserInfo, mdContacts } from './schema';
import { Iregistry, ImdUserInfo, ImdContacts, IfindUser } from './types';
import { Types } from 'mongoose';

/**
 * Registry operations
 */

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
 * @param return If the the record exist it returns true, otherwise false or null
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
    const doc:any = {...condition};
    for (const key in doc) {
        if (!doc[key]) {
            delete doc[key];
        }
    }
    if(doc){
        const user = await mdUserInfo.find(doc);
        return user ? user.shift() : null;
    };
    return null
};

/**
 * Contacts operations
 */
export async function addContact(friend:ImdUserInfo,contacts:ImdContacts){
    contacts.contactIds.push({dataContact: friend.id});
    const res = await contacts.save();
    return res;
};

export async function getContacts(id: string){
    const contacts = await mdContacts.findById(id);
    return contacts;
};

export async function addContactRegistry(owner: ImdUserInfo,friend: ImdUserInfo){
    const contact = new mdContacts({
        contactIds: [{
            idc: friend.id
        }],
    });
    const sContact = await contact.save();
    const registered = await mdUserInfo.findByIdAndUpdate(owner.id,{$set:{ic:sContact.id}});
    return registered;
};

export async function contactExist(idOwner:string,contact:IfindUser){
    const owner = await findUser({id:idOwner}),
    friend = await findUser({id:contact.id, nk: contact.nickname, e: contact.email}),
    contacts = owner && owner.idContacts ? await getContacts(owner.idContacts.toHexString()) : null;
    if(owner && friend && contacts) {
        const exist = contacts.contactIds.some((user)=>user.dataContact.toHexString()===friend.id);
        return {
            owner,
            friend,
            contacts,
            exist
        };
    };
    return {
        owner,
        friend,
        contacts,
        exist: false
    };
};

export async function deleteContact(contacts:ImdContacts,idContact: string) {
    const dContact = contacts.contactIds.find((elem)=>elem.dataContact.toHexString()===idContact);
    if(dContact){
        contacts.contactIds.splice(contacts.contactIds.indexOf(dContact),1);
        const nContacts = await contacts.save();
        return nContacts;
    };
    return null;
};

export async function contactPublicData(contacts: ImdContacts){
    const data = contacts.contactIds.map(async (user)=>{
        const dUser = await findUser({id:user.dataContact.toHexString()});
        if(dUser) {
            return {
                name: dUser.name,
                nickname: dUser.nickname,
                email: dUser.email,
                birthday: dUser.birthday
            };
        };
        return null;
    });
    return data;
};