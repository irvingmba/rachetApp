export const USER_LOGIN = "USER_LOGIN";

function actionUserLogin(data: {}) {
    return {
        type: USER_LOGIN,
        payload: data
    };
};