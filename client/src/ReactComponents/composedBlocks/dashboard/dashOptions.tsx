import React from 'react';
import AddContact from '../contacts/addContact';
import ContactList from '../contacts/contacts';
import ConversationList from '../chat/conversationList';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const DashOptions:React.FunctionComponent = () => {
  const {path} = useRouteMatch();

  return (
    <>
    <Switch>
      <Route exact path={`${path}/`}>
        <ConversationList />
      </Route>
      <Route path={`${path}/contacts`}>
        <ContactList />
      </Route>
    </Switch>
    </>
  );
};

export default DashOptions;