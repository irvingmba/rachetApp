import { MUser, IntContext, MLogin, IpublicFace, typeRegistered } from './types';
import { validInputString, validInputDate, validInputEmail, validInputNickname, validInputPass } from './validation/validation';
import { encryptPswd,comparePswd } from './Authentication/encryption';
import { sign } from './Authentication/authentication';
import { confCookieToken } from './Authentication/cookieConfig';
import { savePswrd, getPwrd } from '../../DBaccess/functions';
import { saveRegistry, existUserInfo, findUser } from '../../DBinfo/functions';

/**
 * Resolver that takes the args and checks if the given data is valid, if it passes the validation, it sends the data to the database to be recorded
 * @param {undefined} parent Data from the parent(not used)
 * @param {MUser} args Registry data that the resolver is going to validate and store
 * @param {IntContext} context Methods from the request and response available(not used)
 * @param return The resolver returns an object where true means that the parameter sent is valid and false means that the parameter already exists of is invalid
 */
const register = async (parent:undefined,args:MUser, context:IntContext)=>{
  const registerUser:MUser = {
    name: validInputString(args.name),
    birthday: validInputDate(args.birthday),
    nickname: validInputNickname(args.nickname),
    email: validInputEmail(args.email),
    password: encryptPswd(validInputPass(args.password)),
  },
  eNickname = await existUserInfo({nk: registerUser.nickname}),
  eEmail = await existUserInfo({e: registerUser.email});
  if(!eNickname && !eEmail) {
    const sPassword = await savePswrd(registerUser.password);
    const sUser = await saveRegistry({...registerUser, password: sPassword.id});
  };
  return {
    nickname: !eNickname,
    email: !eEmail    
  };
};

const login = async (parent:undefined,args:MLogin,context:IntContext)=>{
  const user = await findUser({nk:args.user});
  if(user){
    const password = await getPwrd(user.idPassword.toHexString()),
    passMatch = comparePswd(args.password, password ? password.password : "");
    if( passMatch ){
      context.response.cookie(
        "token",
        sign({id: user.id}),
        confCookieToken
      );
    };
    return {
      user: true,
      password: passMatch
    };
  };
  return {
    user: false,
    password: false
  };
};

export { register, login };