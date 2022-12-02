import { Fragment, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ListItemAvatar, Avatar } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const dummyplayers = [
  {
    avatar_url: "./avatars/avatar-temp-8.png",
    id: 1,
    host: true,
    color: "teal",
    name: "Josephyne",
    score: 3600
  },
  {
    avatar_url: "./avatars/avatar-temp-7.png",
    id: 2,
    host: false,
    color: "green",
    name: "Lookie",
    score: 3000
  },
  {
    avatar_url: "./avatars/avatar-temp-6.png",
    id: 3,
    host: false,
    color: "purple",
    name: "Buttons",
    score: 2800
  },
  {
    avatar_url: "./avatars/avatar-temp-5.png",
    id: 4,
    host: false,
    color: "blue",
    name: "Winkle",
    score: 2400
  },
  {
    avatar_url: "./avatars/avatar-temp-4.png",
    id: 5,
    host: false,
    color: "yellow",
    name: "Idontknow",
    score: 1000
  },
  {
    avatar_url: "./avatars/avatar-temp-3.png",
    id: 6,
    host: false,
    color: "orange",
    name: "DidIlose?",
    score: 400
  },
  {
    avatar_url: "./avatars/avatar-temp-2.png",
    id: 7,
    host: false,
    color: "red",
    name: "Josephyne",
    score: 200
  },
  {
    avatar_url: "./avatars/avatar-temp-1.png",
    id: 8,
    host: false,
    color: "pink",
    name: "Ilostforsure",
    score: 0
  },

];

//map over players!! then return list with percentage based on score in width
//include points, colour and Avatar in bar *****************************************

export default function Podium(props) {

  const [ease, setEase] = useState(0);

  const [players, setPlayers] = useState(
    dummyplayers.map(player => (
      { ...player, score: 0 }
    ))
  );

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setPlayers(dummyplayers);
        setEase(100);
      }, 0);

    return () => clearTimeout(timer);
  }, []);
  // users as state variable, 

  const playerscores = players.map(player => (
    <div className="podium-list-withpoint" style={{ marginTop: '8px' }}>
      <Item className="podium-list-item" key={player.id}
        sx={{
          backgroundColor: player.color,
          width: `${player.score / 10}px`,
          height: '45px',
          transition: 'width 2.5s ease-out',
          overflow: 'hidden',
          border: '1px solid black',
        }}
      >
        <ListItemAvatar key={player.id}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            opacity: ease, transition: 'opacity 2s ease-in'
          }}
        >
          <Avatar src={player.avatar_url} alt={player.label}
            sx={{
              maxWidth: '30%',
              height: 'auto'
            }}
          >
          </Avatar>
        </ListItemAvatar>
        <Typography >{player.name}</Typography>
      </Item>
      <Typography sx={{
        pl: '6px', fontSize: '13px',
        opacity: ease, transition: 'opacity 5s ease-in'
      }}
      >
        {player.score}
      </Typography>
    </div>

  ));

  return (
    <div className="game-board-inner">
      <Box className="podium-list" sx={{ width: '100%', }}>
        <Stack spacing={2}>
          {playerscores}
        </Stack>
      </Box>
    </div>
  );
}



