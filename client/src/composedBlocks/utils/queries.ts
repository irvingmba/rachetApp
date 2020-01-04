export const mutationLogin = (data:{user:string;password:string}) => {
  const {user, password} = data;
  return `mutation{
      login(
        user: "${user}"
        password: "${password}"
      ){
        user
        password
      }
    }`;
};