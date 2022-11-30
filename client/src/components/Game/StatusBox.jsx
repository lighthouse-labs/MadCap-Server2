import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import GamePlayersList from "./GamePlayersList";
import Entry from "./Entry";

export default function StatusBox(props) {
  return (
    <Box className="status-box" sx={{ px: '5px' }}>
      <GamePlayersList />

      <Container className="text-box-main"
        sx={{
          backgroundColor: '#dde5ff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          pr: 1, pb: '4px',
          m: 0,
          width: '71.5%',
          height: '320px',
        }}>
        <Box className="text-box"
          sx={{
            width: '100%',
            'background-color': '#bec5dc',
            maxHeight: '300px',
            overflow: 'auto',
          }}>
          <ul>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
            <li>user1: capture A</li>
          </ul>
        </Box>
        <Entry
          sendMessage={props.sendMessage}
          isConnected={props.isConnected}
          lastMessage={props.lastMessage}
        />
      </Container>
    </Box>
  );
}
