// *********** Action constants ************

// LOGIN
export const USER_LOGIN = "USER_LOGIN";
export const LOGIN_REJECTED = "LOGIN_REJECTED";
export const LOGIN_SUCCESS= "LOGIN_SUCCESS";
// CONTACTS
export const UPDATE_CONTACTS = "UPDATE_CONTACTS"


// make a variable to alter the login state

// create an action that returns

interface ILoginSuccess {
    user: string;
    connected: boolean;
    password?: boolean;
};

export function actionLoginSuccess({user, connected}:ILoginSuccess){
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user,
            connected
        }
    };
};

export function actionUpdateContactList(data:{} | []){
    return {
        type: UPDATE_CONTACTS,
        payload: data
    };
};