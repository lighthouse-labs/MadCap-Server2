// import classNames from "classnames";
import { Fragment } from 'react';
import Button from '@mui/material/Button';


export default function ActionButton(props) {

  return (
    <Fragment>
      <Button variant="contained" color="success" size="large"
        sx={{
          width: 380,
          height: 65,
          fontSize: 30,
          mb: 3.5
        }}
      >{props.message}</Button>
    </Fragment>
  );
}