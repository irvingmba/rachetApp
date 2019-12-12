import { mdUserAccess } from './schema';

export async function savePswrd(password: string){
    const oPassword = new mdUserAccess({
        password
    });
    const res = await oPassword.save();
    return res;
};

export async function getPwrd(id: string) {
    const res = await mdUserAccess.findById(id);
    return res;
};

// export async function noDuplicate(user:IpublicInfo) {
//     const foundNick = await userAccess.find({Nickname: user.nickname});
//     const foundEmail = await userAccess.find({Email: user.email});
//     return {
//         nickname: foundNick.length ? true : false,
//         email: foundEmail.length ? true: false
//     };
// };


// export async function findContacts(userId: string){
//     const users = await userAccess.find({_id: userId}),
//     user = users ? users.shift() : null;
//     if(user) {
//         const contact = contacts.find({_id: user.contacts});
//         return contact;
//     };
//     return null;
// };

// export async function addDBContact(IDowner:string,IDcontact:string){
//     const {exist,IdContacts} = await contactExists(IDowner,{id: IDcontact});
//     if(!exist){
//         IdContacts.Contacts.push(IDcontact);
//         await IdContacts.save();
//         return true;
//     };
//     return false;
// };



// export async function delDBContact(IDowner: string, IDcontact:{id?:string;nickname?:string;email?:string;} ){
//     const {exist,IdContacts,contact} = await contactExists(IDowner,IDcontact);
//     if(exist){
//         IdContacts.Contacts.splice(IdContacts.Contacts.indexOf(contact._id),1);
//         await IdContacts.save();
//         return true;
//     };
//     return false;
// };

// export async function findInfo(IDinfo: string){
//     const info = await userInfo.findById(IDinfo)
//     return info;
// };

// export function objectToString(object:mongoose.Types.ObjectId){
//     return object.toHexString();
// };