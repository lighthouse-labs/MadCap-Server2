import { Fragment } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';


export default function PlayersList(props) {

  //  dummy memory!
  const players = [
    { id: 8, color: 'blue', label: '8', imgPath: './avatars/avatar-temp-8.png', name: 'lorepuse' },
    { id: 7, color: 'green', label: '7', imgPath: './avatars/avatar-temp-7.png', name: 'doongle' },
    { id: 6, color: 'yellow', label: '6', imgPath: './avatars/avatar-temp-6.png', name: 'finglebat' },
    { id: 5, color: 'orange', label: '5', imgPath: './avatars/avatar-temp-5.png', name: 'pricklebash' },
    { id: 4, color: 'orange', label: '4', imgPath: './avatars/avatar-temp-4.png', name: 'dumbsqwad Jr.' }
  ];
  //extract 
  const PlayerListItem = players.map((player) =>
  (
    <ListItem key={players.id}
      style={{ padding: 0 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
      <ListItemAvatar
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Avatar src={player.imgPath} alt={player.label} sx={{ maxWidth: '30%', height: 'auto' }}>
        </Avatar>
        <CircleIcon sx={{ pl: 1, color: player.color }} />
        <Typography sx={{ fontSize: "10px", pl: 1 }}>
          100
        </Typography>
      </ListItemAvatar>
      <ListItemText primary={player.name}
        sx={{ '.MuiTypography-root': { fontSize: "12px", pl: 1 } }} />
    </ListItem>
  ));

  const CustomStyle = styled('div')(({ theme }) => ({
    px: 0,
    // backgroundColor: theme.palette.background.paper
  }));

  return (
    <Fragment>
      <Box className="players-box"
        sx={{ height: 'fit-content', width: '34%' }}>
        <Paper style={{ maxHeight: '315px', width: '100%', paddingRight: '10px', overflow: 'auto' }} elevation={3} sx={{ pl: '8px', }}>
          <Box sx={{
            flexGrow: 1,
            maxWidth: 752,
            '& .MuiListItem-root': { px: 0 }
          }}
          >
            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 0, mb: 0 }} variant="h6" component="div">
                Players
              </Typography>

              <CustomStyle sx={{ '& .MuiList-root': { p: 0, pt: 1 } }}>
                <List dense={true} >
                  <ListItem sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    p: 0
                  }}>
                    <ListItemAvatar sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ maxWidth: '40%', height: 'auto' }}>
                      </Avatar>
                      <Typography sx={{ fontSize: "12px", pl: 1 }}>
                        Host
                      </Typography>
                    </ListItemAvatar>
                    <ListItemText primary={props.name} />
                  </ListItem>
                </List>
                <List>
                  {PlayerListItem}
                </List>
              </CustomStyle>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Fragment>
  );
};