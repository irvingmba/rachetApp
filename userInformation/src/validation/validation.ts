import validator from 'validator';
import { constNickname } from './constraints';

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