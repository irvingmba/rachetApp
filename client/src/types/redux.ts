export interface ISignInData {
    user: string;
    password: string;
};
export interface IActionSignIn {
    type: string;
    payload: ISignInData;
};