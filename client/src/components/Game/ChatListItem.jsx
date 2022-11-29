

export default function ChatListItem(props) {

  return (
    <li>
      {props.type === "chat" && <h2>{props.user}: {props.message}</h2>}
      {props.type === "capture" && <h2>{props.user} captured {props.message}!</h2>}
    </li>
  );
}
