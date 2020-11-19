import React, {useState, useEffect, useRef} from 'react';

import AudioPlayerSwitch from './AudioPlayerSwitch';
import MainNav from './MainNav';



const MainPage = () => {
  const [audioSwitchState, SetAudioSwitchState] = useState("AudioPlayer1");
  function switchPlayer(player){
    SetAudioSwitchState(player);
  }
  return (
    <>
      <MainNav switchPlayer={switchPlayer} audioSwitchState={audioSwitchState} />
      <AudioPlayerSwitch audioSwitchState={audioSwitchState}/>
    </>
  )
}
export default MainPage;