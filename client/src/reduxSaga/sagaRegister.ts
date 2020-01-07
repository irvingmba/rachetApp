import { take, call, put } from "redux-saga/effects";
import { sendRegistry } from "./http/httpRequest";
import { alertRegistryFail } from "../composedBlocks/utils/utilFns";
import { mutationRegistry } from "./http/queries";

export const ASC_REGISTER = "ASC_REGISTER";

export function* sagaRegister() {
  while(true) {
    const action = yield take(ASC_REGISTER);
    try {

      const res = yield call(sendRegistry,mutationRegistry(action.payload));
      console.log(res);
      const {nickname, email}:{nickname:boolean, email:boolean} = res.data.data.register;

      console.log(nickname, email);
      if(nickname && email){
        console.log("The user has been registered woohooo... redirect to login");
      } else {
        yield call(alertRegistryFail, {nickname, email});
      };
    } catch (error) {
      console.log(error);
      console.log("Code 52: Something went wrong with the register saga");
      alert(`Oops, something went wrong with the data that you just introduced, verify it`)
    };
  };
};