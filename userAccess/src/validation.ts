import validator from 'validator';
import { optVInputString } from './types';
import { passInputConst, textInputConst, nicknameInputConst } from './constraints';

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

export function validInputEmail(email:string) {
    try {
        if(validator.isEmail(email) && validator.isLength(email, {min: 5, max: 30})) {
            return validator.trim(email);
        }
        else {
            throw new Error();
        };
    } catch (error) {
        throw "Code 12: Invalid e-mail";
    }
};

export function validInputPass(password: string) {
    if(validator.isLength(password, passInputConst)){
        return password;
    };
    throw "Code 13: Invalid password";
};

export function validInputNickname(nickname: string) {
    if (
        validator.isAlpha(nickname,nicknameInputConst.inputLanguage) &&
        validator.isLength(nickname, nicknameInputConst.stringLength) &&
        !(/[\s]/.test(nickname))
    ) {
        return nickname;
    };
    throw "Code 14: Invalid nickname";
};