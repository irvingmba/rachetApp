import { ALTER } from '../../components/form/formInput';

export function simpleFormReducer(state:{[key:string]:string;},action:{type:string;payload:{[key:string]:string;}}){
  console.log(action);
  if(action.type === ALTER){
    return {...state, ...action.payload}
    return Object.assign(state, action.payload);
  };
  return state;
};