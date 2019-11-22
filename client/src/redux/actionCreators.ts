import { ISignInData, IActionSignIn } from '../types/redux';

export const REGISTER_USER:string = "REGISTER_USER", SIGNIN:string = "SIGNIN";

export const CA_SignIn = (data:ISignInData):IActionSignIn => ({
    type: SIGNIN,
    payload: data
});