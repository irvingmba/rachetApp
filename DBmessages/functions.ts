import { mdUserActions } from "./schema";

function createNewAction<T>(data?:T){
    if(data){
        const action = new mdUserActions(data);
        return action;
    };
    const action = new mdUserActions();
    return action;
};