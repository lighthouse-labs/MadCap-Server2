// import { useState } from 'react';
import ActionWelcome from './ActionWelcome';
import HowToPlay from './HowToPlay';

import './Welcome.css';

export default function Welcome(props) {
  return (
    <div className="welcome-main">
      <h1>MadCap</h1>
      <ActionWelcome />
      <HowToPlay />
    </div>
  );
}