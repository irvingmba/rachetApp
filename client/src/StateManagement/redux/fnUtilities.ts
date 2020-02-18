/**
 * Function that launches an alert window with a warning to the user that the login failed
 * @param state State of the application
 */
export function loginRejected(state:{[x:string]:string;}) {
  const {user, password} = state,
  message = user ? "password" : "user\npassword";
  alert(`Please verify the next data:
${message}
`)
  return {connected: false};
};

export function storeDataSession(data: {}){
  sessionStorage.setItem("appState", JSON.stringify(data));
};

export function getDataSession(){
  const data = sessionStorage.getItem("appState");
  return data ? JSON.parse(data) : {};
};