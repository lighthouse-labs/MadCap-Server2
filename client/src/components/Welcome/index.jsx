import WelcomeBox from './WelcomeBox';
import HowToPlay from './HowToPlay';

import './styles.css';

export default function Welcome(props) {

  return (
    <div className="welcome-main">
      <h1 className="main-title">MadCap</h1>
      <WelcomeBox
        host={props.host}
        url={props.url}
        url_path={props.url_path}
        name={props.name}
        handleName={props.handleName}
        handleJoin={props.handleJoin}
        newPlayer={props.newPlayer}
        onClick={props.onClick}
        setHost={props.setHost}
        transition={props.transition}
      />
      <HowToPlay />
    </div>
  );
}