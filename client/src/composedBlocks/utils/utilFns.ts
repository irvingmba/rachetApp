export function dateToHTMLString() {
  const now = new Date;
  const stringDate = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
  return stringDate;
};

export function nowToStdString() {
  const now = new Date;
  const stringDate = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
  return stringDate;
};

export function verifySamePassword(state: {[x:string]:string;}) {
  const {password, confPassword} = state;
  if(password===confPassword) {
    return true;
  };
  return false;
};

export function alertDifferentPass() {
  alert(`You must type the same password twice, verify it`);
};

export function alertRegistryFail(resp:{nickname: boolean, email: boolean}) {
  const message = `Something went wrong with your request, verify the following data:
${!resp.nickname ? "Nickname\n" : ""}${!resp.email ? "E-mail" : ""}
It may already exists or the data that your introduced is invalid`;
  alert(message);
};