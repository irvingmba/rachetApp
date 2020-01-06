export const USER_LOGIN = "USER_LOGIN";
export const LOGIN_REJECTED = "LOGIN_REJECTED";

function actionUserLogin(data: {}) {
    return {
        type: USER_LOGIN,
        payload: data
    };
};