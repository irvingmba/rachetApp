import { mutationLogin } from "./http/queries";
import { loginUser } from "./http/httpRequest";
import { take, call, put } from "redux-saga/effects"
import { LOGIN_REJECTED } from "../redux/actionCreators";

export const ASC_LOGIN = "ASC_LOGIN";

export function* asLogin(){
  while(true){
    const data = yield take(ASC_LOGIN);
    try {
      const {user, password}:{user:string; password: string;} = "payload" in data ? data.payload : {};
      const res = yield call(loginUser, mutationLogin({user, password}));
      const serverResp:{data:{user:boolean; password:boolean}} = res.data;
      if(serverResp.data.user && serverResp.data.password) {
        console.log("Redirect");
      };
      yield put({type: LOGIN_REJECTED, payload:{user:serverResp.data.user, password:serverResp.data.password}});
    } catch (error) {
      console.log(error);
      throw "Code 51: Something went wrong with the login saga"
    }
  };
};