import { mutationLogin } from "./http/queries";
import { loginUser } from "./http/httpRequest";
import { take, call, put } from "redux-saga/effects";
import { actionLoginSuccess } from "../redux/actionCreators";

export const ASC_LOGIN = "ASC_LOGIN";

export function* sagaLogin(){
  while(true){
    const data = yield take(ASC_LOGIN);
    const {user, password}:{user:string; password: string;} = "payload" in data ? data.payload : {};
    try {
      const res = yield call(loginUser, mutationLogin({user, password}));
      const serverResp:{data:{login:{user:boolean; password:boolean}}} = res.data;
      if(serverResp.data.login.user && serverResp.data.login.password) {
        yield put(actionLoginSuccess({user, connected: true}));
      };
    } catch (error) {
      console.log(error);
      console.log("Code 51: Something went wrong with the login saga");
    }
  };
};