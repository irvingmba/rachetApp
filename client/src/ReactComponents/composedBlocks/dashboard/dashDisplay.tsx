import React from 'react';
import { ConversationWindow } from '../chat/conversation';
import { connect } from 'react-redux';
import { typeRootState } from '../../../StateManagement/redux/reducers';

const DashDisplay:React.FunctionComponent<TdisplayProps> = ({currentContact}) => {

  return (
    <>
    <p>The information is going to be displayed here</p>
    
    {currentContact?.nickname ? <ConversationWindow nickname={currentContact.nickname}/> : "Select a contact"}
    </>
  );
};

/* ------------- REDUX FUNCTIONS ------------ */

function mapStateToProps(state: typeRootState){
  return {
    currentContact: getCurrContact(state)
  };
};

type TdisplayProps = ReturnType<typeof mapStateToProps>;

function getCurrContact(state: typeRootState) {
  return state.contacts.currentContact;
};

const ConDashDisplay = connect(mapStateToProps)(DashDisplay);

export default ConDashDisplay;