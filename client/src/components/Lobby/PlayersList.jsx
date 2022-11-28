import { Fragment, cloneElement } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const players = ['player1', 'rufus', 'shelby', 'theorss'];

export default function PlayersList(props) {

  //const playerList = props.players.map(p => <li>{p}<li>)

  function playerList(element) {
    return players.map((value) =>
      cloneElement(element, {
        key: value,
      }),
    );
  }
  const CustomStyle = styled('div')(({ theme }) => ({
    px: 0,
    // backgroundColor: theme.palette.background.paper,
  }));
  // const [secondary, setSecondary] = useState(false);

  return (
    <Fragment>
      <Box className="players-box">
        <Paper elevation={3} sx={{
          height: 600,
          p: '15px'
        }}>

          <Box sx={{
            flexGrow: 1,
            maxWidth: 752,
            '& .MuiListItem-root': { px: 0 }
          }}
          >
            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Players
              </Typography>
              <CustomStyle >
                <List dense={true} >

                  <ListItem>
                    <ListItemAvatar>
                  <Avatar sx={{}}>
                  </Avatar>
                    </ListItemAvatar>
                  <Typography sx={{fontSize: "12px"}}>
                    Host:&nbsp; 
                  </Typography>
                    <ListItemText primary={props.name}/>
                  </ListItem>

                  {playerList(
                    <ListItem >
                      <ListItemAvatar >
                        <Avatar sx={{}}>

                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="playername"
                      // secondary={secondary ? '75 points' : null}
                      />
                    </ListItem>,
                  )}
                </List>
              </CustomStyle>
            </Grid>

          </Box>
          {/* <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={secondary}
                  onChange={(event) => setSecondary(event.target.checked)}
                />
              }
              label="show stats?"
            />
          </FormGroup> */}
        </Paper>
      </Box>
    </Fragment>
  );
}