import React from 'react';
import { connect } from 'react-redux';
import { typeRootReducer } from '../../../StateManagement/redux/reducers';

/* ------------- LOCAL FUNCTIONS ------------------ */
interface IcontactListProps {
  contactArray: Icontact[] | undefined;
};

interface Icontact {
  nickname: string;
  email: string;
  status?: string;
  birthday?: Date;
};

function mapContactsToList(contacts: Icontact[] | undefined) {
  if(contacts){
    const list = contacts.map((contact,index) => {
      return (<li key={index.toString()} data-nickname={contact.nickname}>{contact.nickname}</li>);
    });
    return list;
  };
  return undefined;
};

/* ------------ REACT COMPONENT ---------------- */

const ContactList:React.FunctionComponent<IcontactListProps> = ({contactArray}:IcontactListProps) => {

  function contactClicked(event:React.MouseEvent<HTMLUListElement, MouseEvent>){
    const target = event.target;
    if("dataset" in target){
      const nickname = target["dataset"]["nickname"];
      console.log(nickname);
    };
  };
  const list = mapContactsToList(contactArray);

  return (
    <>
    <h1>Contacts</h1>
    <ul onClick={contactClicked}>
      {list ? list : "No contacts"}
    </ul>
    </>
  );
};

/* --------- REDUX functions --------- */

/**
 * Function to get contacts from the state
 * @param state 
 */
function getContacts(state:typeRootReducer){
  if("contacts" in state && "contactList" in state["contacts"]){
    return state["contacts"]["contactList"];
  };
  return undefined;
};

/**
 * Function that passes the state to an object for the properties
 * @param state 
 */
function mapStateToProps(state:typeRootReducer){
  return {
    contactArray: getContacts(state)
  };
};

const ConnContactList = connect(mapStateToProps)(ContactList);

export default ConnContactList;