import { Fragment } from 'react';
import Button from '@mui/material/Button';

export default function StartButton(props) {

  return (
    <Fragment>
      <Button onClick={props.handleStart} variant="contained" color="success" size="large"
        sx={{
          width: '93%',
          height: 65,
          fontSize: '21px'
        }}
      >{props.message}</Button>
    </Fragment>
  );
}