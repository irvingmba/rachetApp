import React from 'react';
import { ConversationWindow } from '../chat/conversation';
import { connect } from 'react-redux';
import { typeRootState } from '../../../StateManagement/redux/reducers';

const DashDisplay:React.FunctionComponent<TdisplayProps> = ({user, currentContact}) => {

  return (
    <>
    <p>The information is going to be displayed here</p>
    
    {currentContact?.nickname ? <ConversationWindow 
    user={user}
    /> : "Select a contact"}
    </>
  );
};

/* ------------- REDUX FUNCTIONS ------------ */

function mapStateToProps(state: typeRootState){
  return {
    user: getOwnUser(state),
    currentContact: getCurrContact(state)
  };
};

type TdisplayProps = ReturnType<typeof mapStateToProps>;

function getCurrContact(state: typeRootState) {
  return state.contacts.currentContact;
};

function getOwnUser(state: typeRootState) {
  return state.login.user ? state.login.user : "";
};

const ConDashDisplay = connect(mapStateToProps)(DashDisplay);

export default ConDashDisplay;