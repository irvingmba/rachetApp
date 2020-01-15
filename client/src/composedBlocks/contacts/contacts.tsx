import React from 'react';

interface IcontactListProps {
  contactArray: string[];
};

function mapContactsToList(contacts: string[]) {
  const list = contacts.map((contact,index) => {
    return (<li key={index.toString()}>{contact}</li>);
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

export default ContactList;