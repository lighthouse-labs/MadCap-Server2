import ChatListItem from "./ChatListItem";

export default function ChatList(props) {

  const chats = props.chats.map((chat, index) => {
    
    return (
      <ChatListItem
        key={index}
        message={chat.message}
        user={chat.user}
        type={chat.type}
      />
    );
  });
  return <ul className="chat-list">{chats}</ul>;
}
