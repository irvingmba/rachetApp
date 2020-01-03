export const mutationLogin = (data:{name:string;password:string}) => {
  const {name, password} = data;
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