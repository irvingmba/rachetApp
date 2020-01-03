import { ALTER } from '../../components/form/formInput';

export function actionForm(key: string, data:string) {
  return {
    type: ALTER,
    payload: {
      [key]: data
    }
  };
};

export function simpleFormReducer(state:{[key:string]:string;},action:{type:string;payload:{[key:string]:string;}}){
  console.log(action);
  if(action.type === ALTER){
    return {...state, ...action.payload}
  };
  return state;
};