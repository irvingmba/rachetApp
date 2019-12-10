import { MUser, IntContext, MLogin, IpublicFace } from './types';
import { validInputString, validInputDate, validInputEmail, validInputNickname, validInputPass } from './validation/validation';
import { encryptPswd,comparePswd } from './Authentication/encryption';
import { sign } from './Authentication/authentication';
import { confCookieToken } from './Authentication/cookieConfig';
import { noDuplicate, saveRegistry, userPassword } from '../../userDatabase/schema';

const register = async (parent:undefined,args:MUser, context:IntContext)=>{
  const registerUser:MUser = {
      name: validInputString(args.name),
      birthday: validInputDate(args.birthday),
      nickname: validInputNickname(args.nickname),
      email: validInputEmail(args.email),
      password: encryptPswd(validInputPass(args.password)),
    };
    const duplicated = await noDuplicate({email: registerUser.email, nickname: registerUser.nickname});
    if(duplicated){
      throw "Code 14: This user exist";
    } else {
      const id = await saveRegistry(registerUser);
      return id;
    };
};

const login = async (parent:undefined,args:MLogin,context:IntContext)=>{
    const userFound = await userPassword(validInputNickname(args.user));
    // if (userFound.length){
      const user = userFound.shift;
      // user.
      // const password = comparePswd( args.password, userFound[0] );
    //   if( password ){
    //     context.response.cookie(
    //       "token",
    //       sign({id: userFound.id}),
    //       confCookieToken
    //     );
    //   };
    //   return {
    //     user: true,
    //     password,
    //   };
    // };
    // return {
    //   user: false,
    //   password: false
    // };
    return {
      user: false,
      password: false
    };
  };

  export { register, login };