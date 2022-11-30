import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';

import GamePlayersList from "./GamePlayersList";
import Entry from "./Entry";
import ChatList from './ChatList';

export default function StatusBox(props) {
  return (
    <Box className="status-box" >
    
      <GamePlayersList />

      <Box className="chat-box-main"
        sx={{
          backgroundColor: '#dde5ff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          pr: 0, pl: '4px', pb: '4px',
          m: 0,
          width: '71.5%',
          height: '100%',
        }}>
        <Box className="chat-box"
          sx={{
            backgroundColor: '#bec5dc',
            height: '100%',
            width: '100%',
            maxHeight: '300px',
            overflow: 'auto'
          }}>
        <ChatList chats={props.chats} />
        </Box>
        <Entry
          sendMessage={props.sendMessage}
          isConnected={props.isConnected}
          lastMessage={props.lastMessage}
        />
      </Box>
    </Box>
  );
}
