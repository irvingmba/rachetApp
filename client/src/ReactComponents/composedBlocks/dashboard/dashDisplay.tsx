import React from 'react';
import ConversationWindow from '../chat/conversation';
import { connect } from 'react-redux';
import { typeRootState } from '../../../StateManagement/redux/reducers';
import ContactOptions from '../../components/contact/contactOption';

const DashDisplay:React.FunctionComponent<TdisplayProps> = ({currentContact,  convoId}) => {

  return (
    <>
    <p>The information is going to be displayed here</p>
    
    {currentContact?.username ? <ContactOptions /> : <p>"Select a contact"</p>}
    {convoId ? <ConversationWindow /> : <p>"Select a conversation"</p>}
    </>
  );
};

/* ------------- REDUX FUNCTIONS ------------ */

function mapStateToProps(state: typeRootState){
  return {
    currentContact: getCurrContact(state),
    convoId: getConvoId(state)
  };
};

type TdisplayProps = ReturnType<typeof mapStateToProps>;

function getCurrContact(state: typeRootState) {
  return state.contacts.currentContact;
};

function getConvoId(state: typeRootState) {
  return state.conversations?.currentChat;
};

const ConDashDisplay = connect(mapStateToProps)(DashDisplay);

export default ConDashDisplay;