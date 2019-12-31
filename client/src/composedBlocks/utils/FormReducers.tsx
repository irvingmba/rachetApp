import { ALTER } from '../../components/form/formInput';

export function simpleFormReducer(state:{[key:string]:string;},action:{type:string;payload:{[key:string]:string;}}){
  if(action.type === ALTER){
      return Object.assign(state, action.payload);
  };
  return state;
};