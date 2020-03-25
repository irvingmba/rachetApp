import React from 'react';
import ConversationWindow from '../chat/conversation';
import { connect } from 'react-redux';
import { typeRootState } from '../../../StateManagement/redux/reducers';
import ContactOptions from '../../components/contact/contactOption';
import AddContact from '../contacts/addContact';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { PATH_CONTACTS_V } from '../../../globalConfig';

const DashDisplay:React.FunctionComponent<TdisplayProps> = ({currentContact,  convoId}) => {
  const {path} = useRouteMatch();

  return (
    <>
    <Switch>
      <Route exact path={path}>
        {convoId ? <ConversationWindow /> : <p>"Select a conversation"</p>}
      </Route>
      <Route path={path+PATH_CONTACTS_V}>
        <AddContact />
        {currentContact?.username ? <ContactOptions /> : <p>"Select a contact"</p>}
        <ContactOptions />
      </Route>
    </Switch>
    
    
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