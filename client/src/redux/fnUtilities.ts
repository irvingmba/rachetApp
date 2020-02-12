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