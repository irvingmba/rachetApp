import mongoose from 'mongoose';
import { userAccess, userInfo } from './schema';
import { IcompRegistry, IpublicInfo, IMuserAccess, IMuserInfo } from './types';

export async function saveRegistry(record:IcompRegistry){
    const access = new userAccess({
        Nickname: record.nickname,
        Email: record.email,
        Password: record.password
    });
    const pAccess:IMuserAccess = await access.save();
    const user:IMuserInfo = new userInfo({
        user: pAccess._id,
        Name: record.name,
        Birthday: record.birthday
    });
    const pUser = await user.save();
    return pUser.user;
};

export async function noDuplicate(user:IpublicInfo) {
    const foundNick = await userAccess.find({Nickname: user.nickname});
    const foundEmail = await userAccess.find({Email: user.email});
    if(foundNick.length || foundEmail.length) {
        return true;
    };
    return false;
};

export async function userPassword(nickname:string){
    const found = await userAccess.find({Nickname: nickname});
    return found;
};