import validator from 'validator';
import { constNickname, textInputConst } from './constraints';

export function validNickname(nickname: string) {
    if(
        validator.isAlphanumeric(nickname,constNickname.alpha) &&
        validator.isLength(nickname, constNickname.length) &&
        !(/[\s]/.test(nickname))
    ) {
        return nickname
    };
    throw "Code 22: Invalid nickname";
};

export function validEmail(email: string) {
    if(
        validator.isEmail(email) &&
        validator.isLength(email, {min: 5, max: 30})
    ) {
        return validator.trim(email);
    };
    throw "Code 23: Invalid email";
};

export function validInputString(text: string) {
    try {
        if(
            validator.isAlpha(text,textInputConst.inputLanguage) &&
            validator.isLength(text,textInputConst.stringLength)
        ){
            text=validator.trim(text);
        }else {
            throw new Error;
        }
    } catch (error) {
        throw "Code 10: Invalid string";
    }
    return text;
};

export function validInputDate(date: string) {
    try {
        const buffer=validator.toDate(date);
        if(buffer) {
            return buffer.toDateString();
        }
        else {
            throw new Error();
        };
    } catch (error) {
        throw "Code 11: Invalid date";
    }
};