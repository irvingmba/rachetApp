import { mdUserAccess } from './schema';
import { IsmUserAccess } from './types';

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

// Create

function createRecord(obj: IsmUserAccess) {
    const record = new mdUserAccess(obj);
    return record.save();
};

// Read

function getRecordById(id: string) {
    const record = mdUserAccess.findById(id);
    return record;
};

export function getRecordByEmail(email: string) {
    const finder = {
        e: {
            $eq: email
        }
    };
    const record = mdUserAccess.findOne(finder);
    return record;
};

export function getRecordByNickname(nickname: string) {
    const finder = {
        n: {
            $eq: nickname
        }
    };
    const record = mdUserAccess.findOne(finder);
    return record;
};


// Update

function updateLastLogin(idRecord: string, date: string) {
    const modifier = {
        $set: {
            l: date
        }
    };
    const record = mdUserAccess.findByIdAndUpdate(idRecord, modifier);
    return record;
};

function updateNickname(idRecord: string, nickname: string) {
    const modifier = {
        $set: {
            n: nickname
        }
    };
    const record = mdUserAccess.findByIdAndUpdate(idRecord, modifier);
    return record;
};