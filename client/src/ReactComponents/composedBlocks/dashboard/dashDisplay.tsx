import React from 'react';
import { ConversationWindow } from '../chat/conversation';

const DashDisplay:React.FunctionComponent = () => {

  return (
    <>
    <p>The information is going to be displayed here</p>
    
    <ConversationWindow />
    </>
  );
};

export default DashDisplay;