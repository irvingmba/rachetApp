export const mutLogin = (name:string,password:string) => {
    return `mutation{
        login(
          user: "${name}"
          password: "${password}"
        ){
          user
          password
        }
      }`;
};