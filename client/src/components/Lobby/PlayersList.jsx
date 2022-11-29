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
    {
      color: 'blue', label: 8, imgPath: './avatars/avatar-temp-8.png', name: 'lorepuse'}, 
      {color: 'green', label: 7, imgPath: './avatars/avatar-temp-7.png', name: 'doongle'}, 
      {color: 'yellow', label: 6, imgPath: './avatars/avatar-temp-6.png', name: 'finglebat'}, 
      {color: 'orange', label: 5, imgPath: './avatars/avatar-temp-5.png', name: 'pricklebash'},
      {color: 'orange', label: 4, imgPath: './avatars/avatar-temp-4.png', name: 'dumbsqwad Jr.'}
  ];

  const listItems = players.map((player) =>
  (
    <ListItem sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }}>
      <ListItemAvatar sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Avatar src={player.imgPath} alt={player.label} sx={{maxWidth: '70%', height: 'auto'}}>

        </Avatar>
        <CircleIcon sx={{ pl: 1, color: player.color }} />
      </ListItemAvatar>
      <ListItemText primary={player.name} 
      sx={{'.MuiTypography-root': {fontSize: "12px", pl: 1}}}/>
    </ListItem>
  ));

  const CustomStyle = styled('div')(({ theme }) => ({
    px: 0
    // backgroundColor: theme.palette.background.paper,
  }));

  return (
    <Fragment>
      <Box className="players-box" sx={{ height: 'fit-content' }}>
        <Paper style={{ height: '640px', width: '100%' }} elevation={3} sx={{ p: '15px', }}>
          <Box sx={{
            flexGrow: 1,
            maxWidth: 752,
            '& .MuiListItem-root': { px: 0 }
          }}
          >
            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 0, mb: 2 }} variant="h6" component="div">
                Players
              </Typography>

              <CustomStyle >
                <List dense={true} >
                  <ListItem sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}>
                    <ListItemAvatar sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{}}>
                      </Avatar>
                      <Typography sx={{ fontSize: "12px", pl: 1 }}>
                        Host
                      </Typography>
                    </ListItemAvatar>
                    <ListItemText primary={props.name} />
                  </ListItem>
                </List>
                <List>
                    {listItems}
                </List>
              </CustomStyle>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Fragment>
  );
};