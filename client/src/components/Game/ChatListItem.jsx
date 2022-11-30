export default function ChatListItem(props) {

  return (
    <li>
      {props.type === "chat" && <h4>{props.user}: {props.message}</h4>}
      {props.type === "capture" && <h4>{props.user} captured {props.message}!</h4>}
    </li>
  );
}
