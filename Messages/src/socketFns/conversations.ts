import { IMdUserActions, IMdConversations } from "../../DBmessages/types";
import { getConversation, getMessage } from "../../DBmessages/functions";
import { InDBContacts, InOwnInfo } from "../types";

export async function convos2Client(action: IMdUserActions, contacts:InDBContacts[], ownInfo:InOwnInfo) {
  const convoIds = extractConvoId(action);
  const convoArrayAsync = convoIds.reduce(
    function reqAllConvos(acc:Promise<IMdConversations|null>[], convo) {
      return acc.concat(getConversation(convo.toHexString()));
    }, []
  );
  const convoArray = await Promise.all(convoArrayAsync)
  .catch(function(reason){
    console.error("Something wrong happened when requesting the conversations information\n", reason);
    return null;
  });
  if(!convoArray?.length) return null;
  const messagesAsync = convoArray.map(
    function(DBConvo){
      if(!DBConvo) return null;
      return findMsgsById(DBConvo, contacts, ownInfo);
    }
  );
  const gottenMsgs = await Promise.all(messagesAsync);
  const convos2ClientAsync = convoArray.map(
    function(DBConvo) {
      if(!DBConvo) return null;
      const promConvo = new Promise(function(res,rej){
      res(findMsgsById(DBConvo, contacts, ownInfo));
      })
      .then(function(msgs){
        const convo2Client = {
          id: DBConvo.id,
          members: findUsrnmsById(contacts, DBConvo, ownInfo),
          messages: msgs ? msgs : null,
          updated: DBConvo.updated,
          kind: DBConvo.kind,
          chatName: DBConvo.chatName
        };
        return convo2Client;
      });
      return promConvo;
    }
    );
    const convos2Client = await Promise.all(convos2ClientAsync)
  return convos2Client;
};

function extractConvoId(action: IMdUserActions) {
  const convos = action.IDconversations;
  return convos;
};

function extractNotifId(action: IMdUserActions) {
  const notifications = action.IDnotifications;
  return notifications;
};

function findUsrnmsById(DBContacts:InDBContacts[], ConvoInfo:IMdConversations, ownInfo: InOwnInfo) {
  const contacts = ConvoInfo.participants.map(
    function (participant){
      const username = DBContacts.find((DBContact) => DBContact.id===participant.IDUser.toHexString());
      if(username){
        return {
          username: username.nickname,
          email: username.email
        };
      };
      if(!username && participant.IDUser.toHexString()===ownInfo.id){
        return {
          username: ownInfo.nickname || "unknown",
          email: ownInfo.email || "unknown"
        };
      };
    }
  );
  return contacts;
};

async function findMsgsById(ConvoInfo: IMdConversations, contacts: InDBContacts[], ownInfo: InOwnInfo) {
  const messageIds = ConvoInfo.messages;
  const messagesAsync = messageIds.map(
    function(id){
      return getMessage(id.toHexString());
    }
  );
  const messages = await Promise.all(messagesAsync)
  .catch(function(reason){
    console.error("Something went wrong while requesting your your messages to the database", reason);
    return null;
  });
  if(!messages){
    return [{
      username: "...",
      msg: "...",
      date: 0
    }];
  }
  const msgs2Client = messages.map(
    function(msg){
      const user = contacts.find(
        function(contact){
          return contact.id===msg?.IDUser.toHexString()
        }
      );
      const ownUser = msg?.IDUser.toHexString() === ownInfo.id ? ownInfo.nickname : "...";
      const msgDate = msg?.createdAt;
      const msg2Client = {
        username: user?.nickname || ownUser,
        msg: msg?.message || "...",
        date: msgDate || 0
      };
      return msg2Client;
    }
  );
  return msgs2Client;
};