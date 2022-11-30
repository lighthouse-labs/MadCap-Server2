import Box from "@mui/material/Box";

export default function Notice(props) {

  return (
    <Box className="notice" sx={{}}>
      <h2 style={{width: '270px', height: '50px',
    'text-align': 'center'}}>{props.lastMessage}</h2>
    </Box>
  );
}