// import { useState, useEffect } from 'react';
// import axios from 'axios';

import WelcomeBox from './WelcomeBox';
import HowToPlay from './HowToPlay';

import './styles.css';

export default function Welcome(props) {

  // const [game, setGame] = useState(null);

  // useEffect(() => {
  //   axios.post('/api/games')
  //     .then(res => {
  //       setGame(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     });
  // }, []);

  return (


  <div className="welcome-main">
    <h1 className="main-title">MadCap</h1>
    <WelcomeBox
      avatar={props.avatar}
      setAvatar={props.setAvatar}
      name={props.name}
      handleName={props.handleName}
      onClick={props.onClick} />
    <HowToPlay />
  </div>
  );
}