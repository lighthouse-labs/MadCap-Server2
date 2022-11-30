import ChatListItem from "./ChatListItem";

export default function ChatList(props) {

  const chats = props.chats.map((chat) => {
    
    return (
      <ChatListItem
        key={new Date().toISOString()}
        message={chat.message}
        user={chat.user}
        type={chat.type}
      />
    );
  });
  return <ul className="chat-list">{chats}</ul>;
}
