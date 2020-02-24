import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { typeRootState } from '../../../StateManagement/redux/reducers';
import { Dispatch, AnyAction } from 'redux';
import { actionSelectContact, ISelectContact } from '../../../StateManagement/redux/actionCreators';

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

function contactClicked(event:React.MouseEvent<HTMLUListElement, MouseEvent>){
  const target = event.target as HTMLLIElement;
  if(target.dataset && "nickname" in target.dataset){
    const nickname = target.dataset["nickname"];
    console.log(nickname);
    return nickname || null;
  };
  return null;
};

function selectContact(data:{nickname?: string}|null){
  const nickname = data?.nickname || "";
  return {
    nickname
  };
};

function lazyDispatch(dispatch:Dispatch){
  return function runLazyFunctions(event:React.MouseEvent<HTMLUListElement, MouseEvent>){
    const nickname = contactClicked(event);
    const data = selectContact(nickname ? {nickname} : null);
    dispatch(actionSelectContact(data));
    return;
  };
};

/* ------------ REACT COMPONENT ---------------- */

const ContactList:React.FunctionComponent<IcontactListProps> = ({contactArray}:IcontactListProps) => {

  const dispatch = useDispatch();
  const handleClick = lazyDispatch(dispatch);

  const list = mapContactsToList(contactArray);

  return (
    <>
    <h1>Contacts</h1>
    <ul onClick={handleClick}>
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
function getContacts(state:typeRootState){
  if("contacts" in state && "contactList" in state["contacts"]){
    return state["contacts"]["contactList"];
  };
  return undefined;
};

/**
 * Function that passes the state to an object for the properties
 * @param state 
 */
function mapStateToProps(state:typeRootState){
  return {
    contactArray: getContacts(state)
  };
};

const ConnContactList = connect(mapStateToProps)(ContactList);

export default ConnContactList;