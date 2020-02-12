export const USER_LOGIN = "USER_LOGIN";
export const LOGIN_REJECTED = "LOGIN_REJECTED";
export const LOGIN_SUCCESS= "LOGIN_SUCCESS";

function actionUserLogin(data: {}) {
    return {
        type: USER_LOGIN,
        payload: data
    };
};

interface ILoginRejected {
    user: boolean;
    password: boolean;
};

export function actionLoginRejected({user, password}: ILoginRejected) {
    return {
        type: LOGIN_REJECTED,
        payload: {
            user,
            password
        }
    };
};

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