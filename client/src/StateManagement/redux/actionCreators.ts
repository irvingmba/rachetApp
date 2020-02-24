// *********** Action constants ************

// LOGIN
export const USER_LOGIN = "USER_LOGIN";
export const LOGIN_REJECTED = "LOGIN_REJECTED";
export const LOGIN_SUCCESS= "LOGIN_SUCCESS";
// CONTACTS
export const UPDATE_CONTACTS = "UPDATE_CONTACTS";
export const SELECT_CONTACT = "SELECT_CONTACT";
// CONVERSATIONS
export const GET_MESSAGES = "GET_MESSAGES";

// create an action that returns

interface ILoginSuccess {
    user: string;
    status: Ostatus;
    password?: boolean;
};

export enum Ostatus {
    online = "online",
    offline = "onffline"
};

export function actionLoginSuccess({user, status}:ILoginSuccess){
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user,
            status
        }
    };
};

export type TActLoginSuccess = ReturnType<typeof actionLoginSuccess>;

export function actionUpdateContactList(data:[]){
    return {
        type: UPDATE_CONTACTS,
        payload: data
    };
};

export type TActUpdateContactList = ReturnType<typeof actionUpdateContactList>;

export function actionSelectContact(data: ISelectContact){
    return {
        type: SELECT_CONTACT,
        payload: {...data}
    };
};

export interface ISelectContact {
    nickname: string;
    email?: string;
};

export type TActSelectContact = ReturnType<typeof actionSelectContact>;