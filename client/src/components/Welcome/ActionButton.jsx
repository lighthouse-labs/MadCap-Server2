// import classNames from "classnames";
import Button from '@mui/material/Button';

export default function ActionButton(props) {

  return (
      <Button variant="contained" color="success" size="large"
      sx={{
        width: 380,
        height: 100,
        fontSize: 30,
        mb: 2
      }}
      >{props.message}</Button>
    
  );
}