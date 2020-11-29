import React, {useState} from 'react';

import AudioPlayerSwitch from './AudioPlayerSwitch';
import MainNav from './MainNav';



const MainPage = () => {
  const [audioSwitchState, SetAudioSwitchState] = useState("AudioPlayer2");
  return (
    <>
      <MainNav SetAudioSwitchState={SetAudioSwitchState} audioSwitchState={audioSwitchState} />
      <AudioPlayerSwitch audioSwitchState={audioSwitchState}/>
    </>
  )
}
export default MainPage;