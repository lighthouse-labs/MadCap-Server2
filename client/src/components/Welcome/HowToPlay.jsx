import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function HowToPlay() {
  return (
    <Container style={{ margin: 0, padding: 0, maxWidth: 750 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 406,
        width: '70%',
        height: '100%',
        my: 1
      }}>
      <Box sx={{
        backgroundColor: 'aliceblue',
        width: '100%',
        height: 350,
        display: 'flex',
        justifyContent: 'space-between',
        mt: 5,
        mb: 2
      }}>
        <div className="how-to how-to-description">
          <h2>How To Play</h2>

        </div>
        <Paper elevation={3} sx={{ p: 1 }}>
          <p>how .........to play...the game.........</p>
          <p>visual ...............examples..........</p>
          <p>will................go.. here.....coool.</p>
        </Paper>
      </Box>
      <Box sx={{
        width: '100%',
        height: 300,
        backgroundColor: '#f0f2ff',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div className="how-to about-description">
          <h2>About</h2>

        </div>
        <Paper elevation={3}
          sx={{
            p: 1
          }}
        >
          <p>about ...the game...</p>
          <p>fun facts..........</p>
          <p>will...go here.....coool.</p>
        </Paper>
      </Box>
    </Container>
  );
}