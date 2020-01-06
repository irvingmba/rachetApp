export const mutationLogin = (data:{user:string;password:string}) => {
  const {user, password} = data;
  const query = `query mutation{
    login(
      $user: "${user}"
      $password: "${password}"
    ){
      user
      password
    }
  }`
  return JSON.stringify(query);
};