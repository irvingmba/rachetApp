import { ALTER } from '../../components/form/formInput';

export function actionForm(key: string, data:string) {
  return {
    type: ALTER,
    payload: {
      [key]: data
    }
  };
};

export function genActionForm(data:{}) {
  return {
    type: ALTER,
    payload: {...data}
  };
};

export function simpleFormReducer(state:{[key:string]:string;},action:{type:string;payload:{[key:string]:string;}}){
  if(action.type === ALTER){
    return {...state, ...action.payload}
  };
  return state;
};

export function genFormReducer (state:test1,action:{type:string; payload:{}; [x:string]: string|{};}){
  if(action.type === ALTER){
    return {...state, ...action.payload}
  };
  return state;
};

export interface test1 {
  currentMsg: string;
  test2: boolean;
};