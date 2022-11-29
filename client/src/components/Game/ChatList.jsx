import ChatListItem from "./ChatListItem";

export default function AnswerList(props) {
  const chats = props.chats.map((chat) => {
    return (
      <ChatListItem
        // key={chat.id}
        message={chat.message}
        user={chat.user}
      />
    );
  });
  return <ul>{chats}</ul>;
}
