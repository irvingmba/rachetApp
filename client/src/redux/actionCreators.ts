export const USER_LOGIN = "USER_LOGIN";
export const LOGIN_REJECTED = "LOGIN_REJECTED";
export const LOGIN_SUCCESS= "LOGIN_SUCCESS";
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