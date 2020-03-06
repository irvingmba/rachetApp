import { mdUserInfo, mdContacts } from './schema';
import { Iregistry, ImdUserInfo, ImdContacts, IfindUser } from './types';
import { Query } from 'mongoose';

/**
 * Registry operations
 */

export async function saveRegistry(data: Iregistry){
    const user = new mdUserInfo({
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        birthday: data.birthday,
        idAccess: data.access,
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
 * @param idAccess id - User id
 * @param nk nk - Nickname
 * @param e e - email
 */
export async function findUser( condition:{idAccess?: string; nk?: string; e?:string;} ){
    if(condition.idAccess){
        const user = await mdUserInfo.findById(condition.idAccess);
        return user;
    };
    const doc = Object.entries(condition).reduce(function(acc,prop){
        if(prop[1]){
            return {...acc,[prop[0]]:prop[1]};
        };
        return {...acc};
    },{});
    if(Object.keys(doc).length){
        const userArray = await mdUserInfo.find(doc);
        const user = userArray.shift();
        return user ? user : null;
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
/**
 * Function that takes an string that comes from and ObjectID from the mongodb and looks for the contacts inside this
 * @param id String from an Objectid key
 * @param return returns the record of contacts of this user if the given user id exist, otherwise null
 */
export async function getContacts(id: string){
    if(id){
        const contacts = await mdContacts.findById(id);
        return contacts;
    };
    return null;
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
    const owner = await findUser({idAccess:idOwner}),
    friend = await findUser({idAccess:contact.id, nk: contact.nickname, e: contact.email}),
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
        const dUser = await findUser({idAccess:user.dataContact.toHexString()});
        if(dUser) {
            return {
                id: dUser.id,
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
 /**
  * Function that searchs a user by the id stored in the authentication server
  * @param passId id from the authentication server
  * @returns the user's document that matches the id
  */
export function getUserByIp(passId: string) {
    const condition = {
        ip: passId
    };
    return mdUserInfo.findOne(condition);
};

/*---------- CRUD for registries ---------- */

// Create

function insertAction(id:string, user: ImdUserInfo) {
    const updateDoc = {
        $set: {
            ida: id
        }
    };
    return user.updateOne(updateDoc);
};

/* -------- Query handling --------- */

// Error handling

function handleErrorDBQry<T>(qry: Query<T>):Promise<any> {
    return qry.catch(function(err) {
        console.error(err);
        return null;
    });
};

function exeQryWErrorHdlr<T>(qryFn: (...args:any[]) => Query<T>, errHandler: (qry:Query<T>)=>Promise<any>) {
    return function takeParamsNExec(...args:unknown[]):Promise<T> {
        return errHandler(qryFn(...args))
    };
};

/* ------- Exporting registry operations ------- */


export const incActionInDB = exeQryWErrorHdlr(insertAction, handleErrorDBQry);