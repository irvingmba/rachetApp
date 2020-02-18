/**
 * Takes the current date and returns a string of this date
 * @param return Date in format YYYY-MM-DD
 */
export function dateToHTMLString() {
  const now = new Date;
  const stringDate = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
  return stringDate;
};
/**
 * Takes the current date and returns a string of this date
 * @param return Date in format DD-MM-YYYY
 */
export function nowToStdString() {
  const now = new Date;
  const stringDate = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
  return stringDate;
};

/**
 * Function that watch in the passed state if the parameters of password and confPassword are the same
 * @param state current state where the function is going to look for the arguments
 * @param return A boolean where true means that the password and the confirmation of the password are the same, otherwise false
 */
export function verifySamePassword(state: {[x:string]:string;}) {
  const {password, confPassword} = state;
  if(password===confPassword) {
    return true;
  };
  return false;
};
/**
 * Function that sends an alert with the message "You must type the same password twice, verify it"
 */
export function alertDifferentPass() {
  alert(`You must type the same password twice, verify it`);
};
/**
 * Function that takes an object with the parameters nickname and email and sends an alert message
 * @param resp 
 */
export function alertRegistryFail(resp:{nickname: boolean, email: boolean}) {
  const message = `Something went wrong with your request, verify the following data:
${!resp.nickname ? "Nickname\n" : ""}${!resp.email ? "E-mail" : ""}
It may already exists or the data that your introduced is invalid`;
  alert(message);
};
