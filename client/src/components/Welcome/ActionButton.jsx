import { Fragment } from 'react';
import Button from '@mui/material/Button';

export default function ActionButton(props) {

  return (
    <Fragment>
      <Button onClick={props.handleJoin} variant="contained" color="success" size="large"
        sx={{
          width: '100%',
          maxWidth: '350px',
          height: 65,
          fontSize: 30,
          mb: 3.5
        }}
      >{props.message}</Button>
    </Fragment>
  );
}