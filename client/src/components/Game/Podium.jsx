import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


//map over players!! then return list with percentage based on score in width
//include points, colour and Avatar to right of bar *****************************************

export default function Podium() {
  return (
    <div className="game-board-inner">
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2}>
          <Item>P1 results</Item>
          <Item style={{width: '95%'}}>P2 results</Item>
          <Item style={{width: '75%'}}>P3 results</Item>
          <Item style={{width: '73%'}}>P4 results</Item>
          <Item style={{width: '60%'}}>P5 results</Item>
          <Item style={{width: '30%'}}>P6 results</Item>
          <Item style={{width: '25%'}}>P7 results</Item>
          <Item style={{width: '10%'}}>P8</Item>
        </Stack>
      </Box>
    </div>
  );
}



