import React from 'react';
import AddContact from '../contacts/addContact';
import ContactList from '../contacts/contacts';
import ConversationList from '../chat/conversationList';

const DashOptions:React.FunctionComponent = () => {

  return (
    <>
    <h3>Options</h3>
    <AddContact />
    <ContactList />
    <ConversationList />
    </>
  );
};

export default DashOptions;