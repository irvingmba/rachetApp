import React from 'react';
import uniqueId from 'lodash/uniqueId';

interface IcontactListProps {
  contactArray: string[];
};

function mapContactsToList(contacts: string[]) {
  const list = contacts.map(contact => {
    return (<li key={uniqueId()}>contact</li>);
  });
  return list;
};

const ContactList:React.FunctionComponent<IcontactListProps> = ({contactArray}:IcontactListProps) => {

  const list = mapContactsToList(contactArray);

  return (
    <>
    <h1>Contacts</h1>
    <ul>
      {...list}
    </ul>
    </>
  );
};