export const mutationLogin = (data:{user:string;password:string}) => {
  const {user, password} = data;
  const query = `mutation{
    login(
      user: "${user}"
      password: "${password}"
    ){
      user
      password
    }
  }`
  return {query};
};

export interface IdataRegistry {
  name: string;
  UserID: string;
  birthday: string;
  email: string;
  password: string;
};

export const mutationRegistry = (data:IdataRegistry) => {
  const query = `mutation{
    register(
      name: "${data.name}"
      nickname: "${data.UserID}"
      birthday: "${data.birthday}"
      email: "${data.email}"
      password: "${data.password}"
    ){
      nickname
      email
    }
  }`
  return {query};
};