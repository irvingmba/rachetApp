import { IMdUserActions, IMdConversations } from "../../../DBmessages/types";
import { getConversation, getMessage } from "../../../DBmessages/functions";
import { InDBContacts } from "../types";

export async function convos2Client(action: IMdUserActions, contacts:InDBContacts[]) {
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
  const convos2ClientAsync = convoArray.map(
    function(DBConvo) {
      if(!DBConvo) return null;
      const convo2Client = {
        id: DBConvo.id,
        members: findUsrnmsById(contacts, DBConvo),
        messages: findMsgsById(DBConvo,contacts),
        updated: DBConvo.updated,
        kind: DBConvo.kind,
        chatName: DBConvo.chatName
      };
      return convo2Client;
    }
    );
    const convos2Client = Promise.all(convos2ClientAsync);

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

function findUsrnmsById(DBContacts:InDBContacts[], ConvoInfo:IMdConversations) {
  const contacts = ConvoInfo.participants.map(
    function (participant){
      const username = DBContacts.find((DBContact) => DBContact.id===participant.IDUser.toHexString());
      if(!username){
        return {
          username: "unknown",
          email: "unknown"
        };
      };
      return {
        username: username.nickname,
        email: username.email
      };
    }
  );
  return contacts;
};

async function findMsgsById(ConvoInfo: IMdConversations, contacts: InDBContacts[]) {
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
      const msg2Client = {
        username: contacts.find((contact)=>contact.id===msg?.IDUser.toHexString())?.nickname || "...",
        msg: msg?.message || "...",
        date: Date.parse(msg?._id.getTimestamp()) || 0
      };
      return msg2Client;
    }
  );
  return msgs2Client;
};