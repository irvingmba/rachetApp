import validator from 'validator';
import { optVInputString } from './types';
import { passInputConst } from './constraints';

export function validInputString(text: string, options?: optVInputString) {
    try {
        if(
            validator.isAlpha(text,options ? options.inputLanguage : undefined) &&
            validator.isLength(text,options ? options.stringLength : undefined)
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
        if(validator.isEmail(email)) {
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