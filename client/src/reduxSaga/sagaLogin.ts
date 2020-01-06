import { mutationLogin } from "./http/queries";
import { loginUser } from "./http/httpRequest";
import { take } from "redux-saga/effects"
import { USER_LOGIN } from "../redux/actionCreators";

export function* asLogin(){
  while(true){
    const data = yield take(USER_LOGIN);
    const {user, password}:{user:string; password: string;} = "payload" in data ? data.payload : {};
    console.log(data);
    const res = yield loginUser(mutationLogin({user, password}));
    console.log(res);
  };
};

export function* sagaHello() {
  while(true) {
    const payload = yield take(USER_LOGIN);
    console.log(payload);
  };
};