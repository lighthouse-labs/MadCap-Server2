import { Fragment } from 'react';
import Button from '@mui/material/Button';

export default function ActionButton(props) {

  return (
    <Fragment>
      <Button onClick={props.onClick} variant="contained" color="success" size="large"
        sx={{
          width: 300,
          height: 65,
          fontSize: 30
        }}
      >{props.message}</Button>
    </Fragment>
  );
}