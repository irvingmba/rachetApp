import { MUser, IntContext, MLogin, IpublicFace } from './types';
import { validInputString, validInputDate, validInputEmail, validInputNickname, validInputPass } from './validation/validation';
import { encryptPswd,comparePswd } from './Authentication/encryption';
import { sign } from './Authentication/authentication';
import { confCookieToken } from './Authentication/cookieConfig';
import { noDuplicate, saveRegistry, userPassword } from '../../DBaccess/functions';

const register = async (parent:undefined,args:MUser, context:IntContext)=>{
  const registerUser:MUser = {
      name: validInputString(args.name),
      birthday: validInputDate(args.birthday),
      nickname: validInputNickname(args.nickname),
      email: validInputEmail(args.email),
      password: encryptPswd(validInputPass(args.password)),
    };
    const duplicated = await noDuplicate({email: registerUser.email, nickname: registerUser.nickname});
    if(duplicated.nickname || duplicated.email){
      return {
        nickname: !duplicated.nickname,
        email: !duplicated.email
      };
    } else {
      const id = await saveRegistry(registerUser);
      return {
        nickname: true,
        email: true
      };
    };
};

const login = async (parent:undefined,args:MLogin,context:IntContext)=>{
  const userFound = await userPassword(validInputNickname(args.user));
  const user = userFound.shift();
  if(user){
    const password = comparePswd( args.password, user.Password );
    if( password ){
      context.response.cookie(
        "token",
        sign({id: user.id}),
        confCookieToken
      );
    };
    return {
      user: true,
      password,
    };
  };
    return {
      user: false,
      password: false
    };
  };

  export { register, login };