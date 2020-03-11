import { mutationLogin } from "../../requests/http/mutations";
import { loginUser } from "../../requests/http/httpRequest";
import { take, call, put } from "redux-saga/effects";
import { actionLoginSuccess, Ostatus } from "../redux/actionCreators";
import { ASYNC_LOGIN } from "./asyncActions";


export function* sagaLogin(){
  while(true){
    const data = yield take(ASYNC_LOGIN);
    const {user, password}:{user:string; password: string;} = "payload" in data ? data.payload : {};
    try {
      const res = yield call(loginUser, mutationLogin({user, password}));
      const serverResp:{data:{login:{user:boolean; password:boolean}}} = res.data;
      if(serverResp.data.login.user && serverResp.data.login.password) {
        yield put(actionLoginSuccess({user, status: Ostatus.online}));
      };
    } catch (error) {
      console.log(error);
      console.log("Code 51: Something went wrong with the login saga");
    }
  };
};