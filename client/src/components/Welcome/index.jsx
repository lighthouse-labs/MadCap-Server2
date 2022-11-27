// import { useState } from 'react';
import ActionWelcome from './WelcomeBox';
import HowToPlay from './HowToPlay';

import './styles.css';

export default function Welcome(props) {
  return (
    <div className="welcome-main">
      <h1 className="main-title">MadCap</h1>
      <ActionWelcome />
      <HowToPlay />
    </div>
  );
}