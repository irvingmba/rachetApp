export function loginRejected(state:{[x:string]:string;}) {
  const {user, password} = state,
  message = user ? "password" : "user\npassword";
  alert(`Please verify the next data:
${message}
`)
  return {connected: false};
};